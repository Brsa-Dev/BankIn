# BankIn — Documentation Architecture

> Application web de gestion de patrimoine bancaire  
> Stack : Angular · NestJS · Rust · PostgreSQL · Redis · Docker · Kubernetes · GitHub Actions

---

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Architecture globale](#2-architecture-globale)
3. [Stack technique](#3-stack-technique)
4. [Backend — NestJS](#4-backend--nestjs)
5. [Services Rust (gRPC)](#5-services-rust-grpc)
6. [Frontend — Angular](#6-frontend--angular)
7. [Base de données](#7-base-de-données)
8. [Infrastructure Docker](#8-infrastructure-docker)
9. [CI/CD — GitHub Actions](#9-cicd--github-actions)
10. [Kubernetes](#10-kubernetes)

---

## 1. Vue d'ensemble

BankIn est une application web de gestion de patrimoine bancaire. Elle permet à un utilisateur de :

- Agréger tous ses comptes bancaires en un seul endroit
- Suivre ses transactions et les catégoriser
- Gérer son patrimoine global (immobilier, actions, crypto...)
- Définir des budgets par catégorie
- Fixer des objectifs d'épargne
- Visualiser la consolidation de son patrimoine

---

## 2. Architecture globale

```
┌─────────────────────────────────────────────────────────┐
│                        Internet                         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Angular Frontend (port 4200/80)            │
│           Angular 21 · Angular Material · SCSS          │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP REST (JWT)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              NestJS API (port 3000)                     │
│         Node.js · TypeScript · Prisma · JWT             │
│                                                         │
│  Auth  │  Accounts  │  Transactions  │  Institutions   │
│  Users │  Categories│  Assets        │  Budgets/Goals  │
└──────┬──────────────────────────┬────────────────────────┘
       │                          │
       │ SQL (Prisma)             │ gRPC (port 50051)
       ▼                          ▼
┌─────────────┐        ┌──────────────────────────────────┐
│ PostgreSQL  │        │      Rust Services (port 50051)  │
│  (port 5432)│        │   Tonic · Tokio · Prost          │
└─────────────┘        │                                  │
                       │  - Calculs de rendement          │
┌─────────────┐        │  - Consolidation patrimoine      │
│   Redis     │        │  - Projections d'épargne         │
│  (port 6379)│        └──────────────────────────────────┘
└─────────────┘
```

---

## 3. Stack technique

| Couche | Technologie | Rôle |
|---|---|---|
| Frontend | Angular 21 + Angular Material | Interface utilisateur |
| API principale | NestJS 11 + TypeScript | Logique métier et REST API |
| Services critiques | Rust + Tonic (gRPC) | Calculs financiers performants |
| ORM | Prisma 6 | Accès base de données |
| Base de données | PostgreSQL 16 | Persistance des données |
| Cache / Sessions | Redis 7 | Cache et tokens |
| Containerisation | Docker + Docker Compose | Environnement local |
| Registry | GitHub Container Registry (GHCR) | Stockage des images Docker |
| CI/CD | GitHub Actions | Build, test, push automatiques |
| Orchestration | Kubernetes (Docker Desktop) | Déploiement et scaling |
| Reverse proxy | Nginx | Servir le frontend en prod |

---

## 4. Backend — NestJS

### Structure du projet

```
apps/api/src/
├── modules/
│   ├── auth/                  # Authentification JWT
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   └── jwt-auth.guard.ts
│   ├── users/
│   ├── accounts/              # Gestion des comptes
│   ├── transactions/          # Gestion des transactions
│   ├── institutions/          # Gestion des banques
│   ├── categories/            # Catégories de dépenses
│   ├── assets/                # Actifs patrimoniaux
│   ├── budgets/               # Budgets mensuels
│   ├── goals/                 # Objectifs d'épargne
│   └── patrimoine/            # Client gRPC → Rust
├── prisma/
│   ├── prisma.service.ts      # Service Prisma global (@Global)
│   └── prisma.module.ts
├── proto/
│   └── patrimoine.proto       # Contrat gRPC
├── app.module.ts
└── main.ts
```

### Pattern architectural

Chaque module suit le pattern **Controller → Service → Prisma** :

```
Requête HTTP
     │
     ▼
 JwtAuthGuard          ← vérifie le token JWT
     │
     ▼
 Controller            ← reçoit la requête, valide les données
     │
     ▼
 Service               ← logique métier
     │
     ▼
 PrismaService         ← accès base de données
```

### Endpoints disponibles

```
POST  /auth/register          (public)
POST  /auth/login             (public)

GET   /accounts               🔒
POST  /accounts               🔒
DELETE /accounts/:id          🔒

GET   /institutions           🔒
POST  /institutions           🔒
DELETE /institutions/:id      🔒

GET   /transactions           🔒
POST  /transactions           🔒
DELETE /transactions/:id      🔒

GET   /categories             🔒
POST  /categories             🔒
DELETE /categories/:id        🔒

GET   /assets                 🔒
POST  /assets                 🔒
DELETE /assets/:id            🔒

GET   /budgets                🔒
POST  /budgets                🔒
DELETE /budgets/:id           🔒

GET   /goals                  🔒
POST  /goals                  🔒
DELETE /goals/:id             🔒

POST  /patrimoine/calculate   🔒 → appelle Rust via gRPC
```

🔒 = protégé par JWT

---

## 5. Services Rust (gRPC)

### Pourquoi Rust ?

Rust est utilisé pour les calculs critiques où la performance et la fiabilité sont essentielles. NestJS délègue ces calculs via gRPC.

### Contrat gRPC (`patrimoine.proto`)

```protobuf
syntax = "proto3";
package patrimoine;

service PatrimoineService {
  rpc Calculate (CalculateRequest) returns (CalculateResponse);
}

message CalculateRequest {
  repeated double account_balances = 1;
  repeated double asset_values = 2;
}

message CalculateResponse {
  double total = 1;
  double total_accounts = 2;
  double total_assets = 3;
}
```

### Flux d'appel

```
Angular
   │
   │ POST /patrimoine/calculate
   ▼
NestJS (PatrimoineController)
   │
   │ gRPC :50051
   ▼
Rust (PatrimoineServiceImpl)
   │
   │ Calcul : somme comptes + actifs
   ▼
{ total: 379500, totalAccounts: 9500, totalAssets: 370000 }
```

### Services Rust prévus

| Service | Description |
|---|---|
| `Calculate` | Consolidation patrimoine total ✅ |
| `ProjectSavings` | Projections d'épargne (à venir) |
| `ComputeYield` | Calcul de rendement (à venir) |

---

## 6. Frontend — Angular

### Structure du projet

```
apps/frontend/src/app/
├── core/
│   ├── layout/
│   │   ├── sidebar/           # Navigation principale
│   │   └── topbar/            # Barre du haut
│   ├── services/
│   │   ├── auth.ts            # Service authentification
│   │   ├── accounts.ts        # Service comptes
│   │   └── transactions.ts    # Service transactions
│   ├── interceptors/
│   │   └── auth.interceptor.ts  # Injection token JWT
│   └── guards/
│       └── auth.guard.ts      # Protection des routes
├── features/
│   ├── auth/
│   │   ├── login/             # Page connexion
│   │   └── register/          # Page inscription
│   ├── dashboard/             # Vue d'ensemble patrimoine
│   ├── accounts/
│   │   ├── accounts/          # Liste des comptes
│   │   └── add-account-dialog/
│   └── transactions/
│       ├── transactions/      # Liste des transactions
│       └── add-transaction-dialog/
└── shared/
```

### Routing

```
/                    → redirect /dashboard
/auth/login          → LoginComponent        (public)
/auth/register       → RegisterComponent     (public)
/dashboard           → DashboardComponent    🔒
/accounts            → AccountsComponent     🔒
/transactions        → TransactionsComponent 🔒
```

### Charte graphique

| Variable | Valeur | Usage |
|---|---|---|
| `--color-primary` | `#1A237E` | Bleu marine — couleur principale |
| `--color-accent` | `#00BCD4` | Cyan — accents |
| `--color-positive` | `#4CAF50` | Vert — gains, revenus |
| `--color-negative` | `#F44336` | Rouge — pertes, dépenses |
| `--color-background` | `#F5F7FA` | Fond de page |
| `--color-surface` | `#FFFFFF` | Fond des cartes |

---

## 7. Base de données

### Schéma Prisma

```
User
 ├── id, email, passwordHash, firstName, lastName, currency
 ├── → Institution[]
 ├── → Budget[]
 └── → Goal[]

Institution
 ├── id, name, logoUrl, userId
 └── → Account[]

Account
 ├── id, name, type, balance, currency, institutionId
 └── → Transaction[]

Transaction
 ├── id, label, amount, date, type, accountId, categoryId
 └── → Category?

Category
 ├── id, name, icon, color
 ├── → Transaction[]
 └── → Budget[]

Asset
 └── id, name, type, estimatedValue, currency, userId

Budget
 └── id, month, year, limit, userId, categoryId

Goal
 └── id, name, targetAmount, currentAmount, deadline, userId
```

### Types énumérés

```
AccountType   : CHECKING | SAVINGS | INVESTMENT | LIFE_INSURANCE | CRYPTO
TransactionType : DEBIT | CREDIT
AssetType     : REAL_ESTATE | STOCK | CRYPTO | VEHICLE | OTHER
```

---

## 8. Infrastructure Docker

### Docker Compose

```yaml
services:
  postgres      # PostgreSQL 16        port 5432
  redis         # Redis 7 Alpine       port 6379
  rust-services # Rust gRPC            port 50051
  api           # NestJS               port 3000
  frontend      # Angular + Nginx      port 4200→80
```

### Dockerfiles

**NestJS** — multi-stage build :
```
Stage 1 (builder) : node:22-alpine → npm install → prisma generate → npm run build
Stage 2 (prod)    : node:22-alpine → npm install --omit=dev → copie dist/ + prisma/
```

**Rust** — multi-stage build :
```
Stage 1 (builder) : rust:1.95-alpine → cargo build --release
Stage 2 (prod)    : alpine:3.20 → binaire seul (~10MB)
```

**Angular** — multi-stage build :
```
Stage 1 (builder) : node:22-alpine → npm install → ng build --configuration=production
Stage 2 (prod)    : nginx:alpine → copie dist/ → nginx.conf
```

---

## 9. CI/CD — GitHub Actions

### Pipelines

```
.github/workflows/
├── api.yml         # Déclenché sur push dans apps/api/
├── rust.yml        # Déclenché sur push dans apps/rust-services/
└── frontend.yml    # Déclenché sur push dans apps/frontend/
```

### Flux CI/CD

```
git push (main)
     │
     ▼
GitHub Actions
     │
     ├── Checkout code
     ├── Login to GHCR
     └── Build & Push Docker image
              │
              ▼
         ghcr.io/brsa-dev/
         ├── bankin-api:latest
         ├── bankin-rust:latest
         └── bankin-frontend:latest
```

---

## 10. Kubernetes

### Cluster

```
Namespace: bankin
│
├── Deployment: postgres        (1 replica)
│   └── Service: postgres       :5432
│
├── Deployment: redis           (1 replica)
│   └── Service: redis          :6379
│
├── Deployment: rust-services   (1 replica)
│   └── Service: rust-services  :50051
│
├── Deployment: api             (2 replicas)
│   └── Service: api            :3000
│
├── Deployment: frontend        (1 replica)
│   └── Service: frontend       :80
│
├── Secret: bankin-secrets      (DATABASE_URL, JWT_SECRET)
├── Secret: ghcr-secret         (pull GHCR images)
└── Job: prisma-migrate         (migrations BDD au déploiement)
```

### Fichiers K8s

```
infra/k8s/
├── namespace.yml
├── secrets.yml
├── postgres.yml
├── redis.yml
├── rust-services.yml
├── api.yml
├── frontend.yml
└── migrate.yml
```

### Commandes utiles

```bash
# Voir tous les pods
kubectl get pods -n bankin

# Voir les logs d'un service
kubectl logs -n bankin deployment/api
kubectl logs -n bankin deployment/frontend

# Accéder au frontend
kubectl port-forward service/frontend 4200:80 -n bankin

# Accéder à l'API
kubectl port-forward service/api 3000:3000 -n bankin

# Lancer les migrations
kubectl apply -f infra/k8s/migrate.yml

# Scaler l'API
kubectl scale deployment api --replicas=3 -n bankin
```

---

## Monorepo — Structure globale

```
BankIn/
├── apps/
│   ├── api/                   # NestJS
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── src/
│   │   └── Dockerfile
│   ├── frontend/              # Angular
│   │   ├── src/
│   │   ├── nginx.conf
│   │   └── Dockerfile
│   └── rust-services/         # Rust
│       ├── proto/
│       │   └── patrimoine.proto
│       ├── src/
│       │   └── main.rs
│       ├── build.rs
│       └── Dockerfile
├── infra/
│   ├── docker/
│   └── k8s/
│       ├── namespace.yml
│       ├── secrets.yml
│       ├── postgres.yml
│       ├── redis.yml
│       ├── rust-services.yml
│       ├── api.yml
│       ├── frontend.yml
│       └── migrate.yml
├── .github/
│   └── workflows/
│       ├── api.yml
│       ├── rust.yml
│       └── frontend.yml
├── docker-compose.yml
└── README.md
```

---

*Documentation générée le 30 mai 2026*
