import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Category, TransactionType } from '../../models/transaction.model';
import { Layout } from '../layout/layout';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, ReactiveFormsModule, Layout, TranslateModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
  standalone: true
})
export class TransactionForm implements OnInit {
  transactionForm: FormGroup;
  isEditMode = false;
  transactionId?: number;
  loading = false;
  error: string | null = null;

  transactionTypes = Object.values(TransactionType);
  categories = Object.values(Category);

  incomeCategories = [
    Category.SALARY,
    Category.FREELANCE,
    Category.INVESTMENT,
    Category.GIFT,
    Category.OTHER_INCOME
  ];

  expenseCategories = [
    Category.RENT,
    Category.UTILITIES,
    Category.GROCERIES,
    Category.TRANSPORT,
    Category.HEALTHCARE,
    Category.ENTERTAINMENT,
    Category.EDUCATION,
    Category.SHOPPING,
    Category.RESTAURANT,
    Category.TRAVEL,
    Category.INSURANCE,
    Category.OTHER_EXPENSE
  ];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.transactionForm = this.fb.group({
      type: [TransactionType.EXPENSE, Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: [this.getTodayDate(), Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.transactionId = +id;
      this.loadTransaction();
    }

    // Update available categories when type changes
    this.transactionForm.get('type')?.valueChanges.subscribe(() => {
      this.transactionForm.patchValue({ category: '' });
    });
  }

  loadTransaction(): void {
    if (!this.transactionId) return;

    this.loading = true;
    this.transactionService.getTransactionById(this.transactionId).subscribe({
      next: (transaction) => {
        this.transactionForm.patchValue({
          type: transaction.type,
          category: transaction.category,
          amount: transaction.amount,
          date: transaction.date,
          description: transaction.description
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'transactions.failedToLoad';
        this.loading = false;
        console.error('Error loading transaction:', err);
      }
    });
  }

  getAvailableCategories(): Category[] {
    const type = this.transactionForm.get('type')?.value;
    return type === TransactionType.INCOME ? this.incomeCategories : this.expenseCategories;
  }

  formatCategory(category: string): string {
    return this.translate.instant(`categories.${category}`);
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;
    const formValue = this.transactionForm.value;

    const request = {
      type: formValue.type,
      category: formValue.category,
      amount: parseFloat(formValue.amount),
      date: formValue.date,
      description: formValue.description || undefined
    };

    const operation = this.isEditMode && this.transactionId
      ? this.transactionService.updateTransaction(this.transactionId, request)
      : this.transactionService.createTransaction(request);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        this.error = this.isEditMode ? 'transactions.failedToUpdate' : 'transactions.failedToCreate';
        this.loading = false;
        console.error('Error saving transaction:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/transactions']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.transactionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
