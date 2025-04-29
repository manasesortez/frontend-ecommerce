import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  StoreStatsResponse,
  StoreStats,
  StoreStatsErrorResponse,
  GetStoreStatsQuery
} from '../models/store-stats.models';

@Injectable({
  providedIn: 'root'
})
export class StoreStatsService {
  private readonly baseUrl = `store-stats/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with store stats service';
    
    if (error?.error?.error) {
      errorMessage = error.error.error;
    } else if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getStoreStats(storeId: number, recalculate: boolean = false): Observable<StoreStatsResponse> {
    const params: GetStoreStatsQuery | any = { recalculate: recalculate ? 'true' : 'false' };
    
    return this.http.get<StoreStatsResponse>(
      `${this.baseUrl}${storeId}`,
      { params }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  calculateStoreStats(storeId: number): Observable<StoreStatsResponse> {
    return this.http.post<StoreStatsResponse>(
      `${this.baseUrl}${storeId}/calculate`,
      {}
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}