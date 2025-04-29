import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  SubscriptionLogsResponse,
  SubscriptionLogWithRelations,
  DeleteLogsResponse
} from '../models/subscription-logs.models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionLogsService {
  private readonly baseUrl = `subscription-log/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with subscription logs service';
    
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.error?.error_code) {
      errorMessage = `${errorMessage}: ${error.error.error_code}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get all subscription logs (superadmin only)
   * @returns Observable with array of subscription logs
   */
  getAllSubscriptionLogs(): Observable<SubscriptionLogWithRelations[]> {
    return this.http.get<SubscriptionLogsResponse>(
      `${this.baseUrl}show/all/super-admin`
    ).pipe(
      map(response => response.logs),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get subscription logs for current store owner
   * @returns Observable with array of subscription logs
   */
  getStoreOwnerLogs(): Observable<SubscriptionLogWithRelations[]> {
    return this.http.get<SubscriptionLogsResponse>(
      `${this.baseUrl}show/all/store-owner`
    ).pipe(
      map(response => response.logs),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete all subscription logs (superadmin only)
   * @returns Observable with deletion result
   */
  deleteAllLogs(): Observable<DeleteLogsResponse> {
    return this.http.delete<DeleteLogsResponse>(
      `${this.baseUrl}delete/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}