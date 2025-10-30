import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth';

interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  lastTransactions: Transaction[];
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: Date;
  category: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  username: string = '';
  financialSummary: FinancialSummary = {
    totalIncome: 5420.50,
    totalExpense: 3280.75,
    balance: 2139.75,
    lastTransactions: [
      {
        id: 1,
        description: 'Stipendio Gennaio',
        amount: 2500.00,
        type: 'income',
        date: new Date('2025-01-15'),
        category: 'Stipendio'
      },
      {
        id: 2,
        description: 'Supermercato',
        amount: -120.50,
        type: 'expense',
        date: new Date('2025-01-14'),
        category: 'Alimentari'
      },
      {
        id: 3,
        description: 'Affitto',
        amount: -800.00,
        type: 'expense',
        date: new Date('2025-01-10'),
        category: 'Casa'
      },
      {
        id: 4,
        description: 'Freelance Project',
        amount: 1200.00,
        type: 'income',
        date: new Date('2025-01-08'),
        category: 'Lavoro'
      }
    ]
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.username = currentUser.username;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTransactionClass(transaction: Transaction): string {
    return transaction.type === 'income' ? 'text-green-400' : 'text-red-400';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('it-IT');
  }
}
