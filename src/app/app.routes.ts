import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth/auth-guard';
import { TransactionList } from './components/transaction-list/transaction-list';
import { TransactionForm } from './components/transaction-form/transaction-form';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'transactions', component: TransactionList, canActivate: [authGuard] },
  { path: 'transactions/new', component: TransactionForm, canActivate: [authGuard] },
  { path: 'transactions/edit/:id', component: TransactionForm, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
