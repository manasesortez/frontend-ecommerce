import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  PriceHistoryResponse,
  StockHistoryResponse
} from '../models/product-history.models';

@Injectable({
  providedIn: 'root'
})
export class ProductHistoryService {
  private readonly baseUrl = `history/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with product history service';
    
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
   * Get price history for a specific product
   * @param productId ID of the product
   * @returns Observable with PriceHistoryResponse
   */
  getPriceHistory(productId: number): Observable<PriceHistoryResponse> {
    return this.http.get<PriceHistoryResponse>(
      `${this.baseUrl}price/${productId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get stock history for a specific product
   * @param productId ID of the product
   * @returns Observable with StockHistoryResponse
   */
  getStockHistory(productId: number): Observable<StockHistoryResponse> {
    return this.http.get<StockHistoryResponse>(
      `${this.baseUrl}stock/${productId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}