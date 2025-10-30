import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Transaction, TransactionRequest, TransactionType } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly apiUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  createTransaction(request: TransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, request);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransactionsByType(type: TransactionType): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/type/${type}`);
  }

  getTransactionsByDateRange(startDate: string, endDate: string): Observable<Transaction[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<Transaction[]>(`${this.apiUrl}/date-range`, { params });
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  updateTransaction(id: number, request: TransactionRequest): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, request);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
