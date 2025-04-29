import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  RatingsResponse,
  StoreRatingsResponse,
  addRatingUser,
  responseUpdate,
  msgRating,
  StoreRatingStats
} from '../models/ratings.models';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  private readonly baseUrl = `ratings/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with ratings service';
    
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
   * Rate a store for a completed order
   * @param orderId Order ID
   * @param ratingData Rating data (rating and comment)
   * @returns Observable with success message
   */
  rateStore(orderId: number, ratingData: addRatingUser): Observable<msgRating> {
    return this.http.post<msgRating>(
      `${this.baseUrl}store/add/${orderId}`,
      ratingData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Rate a user for a completed order (store owner only)
   * @param orderId Order ID
   * @param ratingData Rating data (rating and comment)
   * @returns Observable with success message
   */
  rateUser(orderId: number, ratingData: addRatingUser): Observable<msgRating> {
    return this.http.post<msgRating>(
      `${this.baseUrl}user/add/${orderId}`,
      ratingData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get all ratings for a specific store
   * @param storeId Store ID
   * @returns Observable with StoreRatingsResponse
   */
  getStoreRatings(storeId: number): Observable<StoreRatingsResponse> {
    return this.http.get<StoreRatingsResponse>(
      `${this.baseUrl}store/show/${storeId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get all ratings for a specific user
   * @param userId User ID
   * @returns Observable with RatingsResponse
   */
  getUserRatings(userId: number): Observable<RatingsResponse> {
    return this.http.get<RatingsResponse>(
      `${this.baseUrl}user/show/${userId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Respond to a store rating (store owner only)
   * @param ratingId Rating ID
   * @param response Response text
   * @returns Observable with success message
   */
  respondToRating(ratingId: number, response: string): Observable<msgRating> {
    const responseData: responseUpdate = { response };
    
    return this.http.put<msgRating>(
      `${this.baseUrl}response/update/${ratingId}`,
      responseData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get rating statistics for a store or user
   * @param type Entity type ('store' or 'user')
   * @param id Entity ID (store ID or user ID)
   * @returns Observable with StoreRatingStats
   */
  getRatingStats(type: 'store' | 'user', id: number): Observable<StoreRatingStats> {
    return this.http.get<StoreRatingStats>(
      `${this.baseUrl}stats/show/${type}/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}