import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import {
  SubscriptionTransactionsResponse,
  SingleTransactionResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse,
  SubscriptionTransactionWithRelations
} from '../models/subscription-transactions.models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTransactionsService {
  private readonly baseUrl = `transactions/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with subscription transactions service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.error?.code) {
      errorMessage = `${errorMessage}: ${error.error.code}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Create a new subscription transaction
   * @param transactionData Transaction data to create
   * @returns Observable with created transaction details
   */
  createTransaction(transactionData: {
    id_user_transaction: number;
    id_plan_transaction: number;
    paypal_id_transaction: string;
    amount_transaction: number;
    subdomain: string;
    status_transaction: string;
    frontend_redirect_url: string;
  }): Observable<CreateTransactionResponse> {
    return this.http.post<CreateTransactionResponse>(
      `${this.baseUrl}add`,
      transactionData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get all transactions (superadmin only)
   * @returns Observable with array of transactions
   */
  getAllTransactions(): Observable<SubscriptionTransactionWithRelations[]> {
    return this.http.get<SubscriptionTransactionsResponse>(
      `${this.baseUrl}show/admin/all`
    ).pipe(
      map(response => response.transactions),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get all transactions for current user
   * @returns Observable with array of user's transactions
   */
  getUserTransactions(): Observable<SubscriptionTransactionWithRelations[]> {
    return this.http.get<SubscriptionTransactionsResponse>(
      `${this.baseUrl}show/user/all`
    ).pipe(
      map(response => response.transactions),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get specific transaction by ID
   * @param id Transaction ID
   * @returns Observable with transaction details
   */
  getTransactionById(id: number): Observable<SubscriptionTransactionWithRelations> {
    return this.http.get<SingleTransactionResponse>(
      `${this.baseUrl}show/user/${id}`
    ).pipe(
      map(response => response.transaction),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update a transaction (superadmin only)
   * @param id Transaction ID
   * @param updateData Data to update
   * @returns Observable with success message
   */
  updateTransaction(
    id: number,
    updateData: {
      status_transaction?: string;
      data_transaction?: string;
    }
  ): Observable<UpdateTransactionResponse> {
    return this.http.put<UpdateTransactionResponse>(
      `${this.baseUrl}admin/update/${id}`,
      updateData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a transaction (superadmin only)
   * @param id Transaction ID
   * @returns Observable with success message
   */
  deleteTransaction(id: number): Observable<DeleteTransactionResponse> {
    return this.http.delete<DeleteTransactionResponse>(
      `${this.baseUrl}admin/delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}