import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  CreatePayPalTransactionRequest,
  CreatePayPalTransactionResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
  PayPalErrorResponse
} from '../models/subscriptions-paypal.models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsPaypalService {
  private readonly baseUrl = `subscriptions-paypal/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with PayPal subscription service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Create a new PayPal subscription transaction
   * @param transactionData Data for creating the transaction
   * @returns Observable with transaction response
   */
  createTransaction(transactionData: CreatePayPalTransactionRequest): Observable<CreatePayPalTransactionResponse> {
    return this.http.post<CreatePayPalTransactionResponse>(
      `${this.baseUrl}create`,
      transactionData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Confirm a PayPal payment
   * @param confirmationData Data for confirming the payment
   * @returns Observable with confirmation response
   */
  confirmPayment(confirmationData: ConfirmPaymentRequest): Observable<ConfirmPaymentResponse> {
    return this.http.post<ConfirmPaymentResponse>(
      `${this.baseUrl}confirm`,
      confirmationData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}