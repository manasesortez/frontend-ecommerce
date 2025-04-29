import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { StatusHistoryRes } from '../models/orders-status-history';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusHistoryService {
  private readonly baseUrl = `order-status-history/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with order status history service';
    
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
   * Get all status history for a specific order
   * @param orderId The ID of the order
   * @returns Observable with status history data
   */
  getStatusHistoryByOrderId(orderId: number): Observable<StatusHistoryRes> {
    return this.http.get<StatusHistoryRes>(
      `${this.baseUrl}show/${orderId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}