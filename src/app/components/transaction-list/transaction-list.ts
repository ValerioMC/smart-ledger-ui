import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionType } from '../../models/transaction.model';
import { Layout } from '../layout/layout';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, Layout, TranslateModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
  standalone: true
})
export class TransactionList implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  loading = false;
  error: string | null = null;
  selectedFilter: 'all' | 'income' | 'expense' = 'all';
  TransactionType = TransactionType;

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    this.error = null;
    this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'transactions.failedToLoad';
        this.loading = false;
        console.error('Error loading transactions:', err);
      }
    });
  }

  applyFilter(): void {
    if (this.selectedFilter === 'all') {
      this.filteredTransactions = this.transactions;
    } else if (this.selectedFilter === 'income') {
      this.filteredTransactions = this.transactions.filter(t => t.type === TransactionType.INCOME);
    } else {
      this.filteredTransactions = this.transactions.filter(t => t.type === TransactionType.EXPENSE);
    }
  }

  onFilterChange(filter: 'all' | 'income' | 'expense'): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpense(): number {
    return this.transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  editTransaction(transaction: Transaction): void {
    this.router.navigate(['/transactions/edit', transaction.id]);
  }

  deleteTransaction(transaction: Transaction): void {
    this.translate.get('transactions.deleteConfirm').subscribe((message: string) => {
      if (confirm(message)) {
        this.transactionService.deleteTransaction(transaction.id).subscribe({
          next: () => {
            this.loadTransactions();
          },
          error: (err) => {
            this.error = 'transactions.failedToDelete';
            console.error('Error deleting transaction:', err);
          }
        });
      }
    });
  }

  createNew(): void {
    this.router.navigate(['/transactions/new']);
  }

  formatCategory(category: string): string {
    return this.translate.instant(`categories.${category}`);
  }
}
