import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth';

const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard-module').then(m => m.DashboardModule)
  },
  {
    path: 'accounts',
    canActivate: [authGuard],
    loadChildren: () => import('./features/accounts/accounts-module').then(m => m.AccountsModule)
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    loadChildren: () => import('./features/transactions/transactions-module').then(m => m.TransactionsModule)
  },
  {
    path: 'budgets',
    canActivate: [authGuard],
    loadChildren: () => import('./features/budgets/budgets-module').then(m => m.BudgetsModule)
  },
  {
    path: 'assets',
    canActivate: [authGuard],
    loadChildren: () => import('./features/assets/assets-module').then(m => m.AssetsModule)
  },
  {
    path: 'goals',
    canActivate: [authGuard],
    loadChildren: () => import('./features/goals/goals-module').then(m => m.GoalsModule)
  },
  { path: '**', redirectTo: 'dashboard' }
];
