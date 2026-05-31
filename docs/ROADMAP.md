# BankIn — Roadmap

## ✅ V1 — Terminée

- API NestJS complète (auth JWT, 8 modules CRUD)
- Services Rust via gRPC (consolidation patrimoine)
- Frontend Angular avec Angular Material
- Docker multi-stage (NestJS, Rust, Angular + Nginx)
- CI/CD GitHub Actions (3 pipelines)
- Déploiement Kubernetes complet

---

## 🚀 Court terme

### Import CSV
Permettre à l'utilisateur d'importer ses transactions depuis un export CSV de sa banque. Toutes les banques françaises proposent cette fonctionnalité.

### Page Budgets
L'écran Angular n'existe pas encore. Le module API est prêt. Afficher les budgets par catégorie avec une barre de progression mensuelle.

### Page Actifs
Même situation que Budgets. Afficher le patrimoine hors bancaire (immobilier, actions, crypto, véhicule...) avec la valeur estimée totale.

### Page Objectifs
Afficher les objectifs d'épargne avec une barre de progression vers le montant cible et la date limite.

---

## 📈 Moyen terme

### Graphiques
- Courbe d'évolution du patrimoine dans le temps
- Donut chart de répartition par catégorie
- Graphique des dépenses par mois
- Les maquettes Claude Design sont déjà prêtes comme référence

### Notifications
Alertes quand un budget mensuel est dépassé. Notification dans la topbar.

### Barre de recherche
La barre de recherche dans la topbar est présente visuellement mais pas encore fonctionnelle. Permettre de rechercher une transaction, un compte, une institution.

### Profil utilisateur
Page paramètres pour modifier son nom, email, mot de passe et devise de référence.

### Tests automatisés
- Tests unitaires NestJS avec Jest
- Tests e2e avec Postman/Newman dans le pipeline CI/CD

---

## 🎯 Long terme

### Projections Rust
Utiliser les services Rust pour calculer des projections patrimoniales :
- "Dans 10 ans avec ce taux d'épargne, j'aurai X€"
- Simulation de rendement d'un PEA
- Calcul d'intérêts composés

### Multi-devises
Convertir automatiquement tous les soldes en euros via une API de taux de change. Utile pour les comptes crypto ou les comptes à l'étranger.

### Export PDF
Générer un rapport mensuel PDF de ses finances avec résumé patrimoine, transactions, budgets.

### Application mobile
Compiler l'application Angular en app mobile iOS/Android via **Capacitor**. Le code Angular existant est réutilisable.

### Ingress Kubernetes
Configurer un Ingress K8s avec un vrai nom de domaine pour déployer BankIn sur un vrai cluster cloud (DigitalOcean, GCP...).

### Monitoring
Mettre en place **Prometheus + Grafana** pour monitorer les performances de l'API et des services Rust.

---

## 💡 Idées futures

- Connexion avec une API bancaire agréée DSP2 (Bridge by Bankin', Budget Insight) pour importer les transactions automatiquement — nécessite une licence AISP
- Dark mode
- Widget résumé patrimoine (tableau de bord personnalisable)
- Partage de budget entre utilisateurs (compte joint)
