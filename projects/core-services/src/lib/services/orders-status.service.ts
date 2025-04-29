import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  getAllStatusesRes,
  getByIdStatusRes
} from '../models/orders-status.models';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private readonly baseUrl = `order-status/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with order status service';
    
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
   * Get all order statuses
   * @returns Observable with list of all order statuses
   */
  getAllOrderStatuses(): Observable<getAllStatusesRes> {
    return this.http.get<getAllStatusesRes>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific order status by ID
   * @param id Status ID
   * @returns Observable with the order status data
   */
  getOrderStatusById(id: number): Observable<getByIdStatusRes> {
    return this.http.get<getByIdStatusRes>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}