export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum Category {
  // Income categories
  SALARY = 'SALARY',
  FREELANCE = 'FREELANCE',
  INVESTMENT = 'INVESTMENT',
  GIFT = 'GIFT',
  OTHER_INCOME = 'OTHER_INCOME',

  // Expense categories
  RENT = 'RENT',
  UTILITIES = 'UTILITIES',
  GROCERIES = 'GROCERIES',
  TRANSPORT = 'TRANSPORT',
  HEALTHCARE = 'HEALTHCARE',
  ENTERTAINMENT = 'ENTERTAINMENT',
  EDUCATION = 'EDUCATION',
  SHOPPING = 'SHOPPING',
  RESTAURANT = 'RESTAURANT',
  TRAVEL = 'TRAVEL',
  INSURANCE = 'INSURANCE',
  OTHER_EXPENSE = 'OTHER_EXPENSE'
}

export interface Transaction {
  id: number;
  userId: number;
  type: TransactionType;
  category: Category;
  amount: number;
  date: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionRequest {
  type: TransactionType;
  category: Category;
  amount: number;
  date: string;
  description?: string;
}
