import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  getAllFavoritesRes,
  getByIdFavoritesRes,
  favorites,
  addFavorite,
  addFavoriteRes,
  msgFavorite
} from '../models/favorite.models';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly baseUrl = `favorites/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with favorites service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllFavorites(): Observable<getAllFavoritesRes> {
    return this.http.get<getAllFavoritesRes>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getFavoriteById(id: number): Observable<getByIdFavoritesRes> {
    return this.http.get<getByIdFavoritesRes>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createFavorite(favoriteData: addFavorite): Observable<addFavoriteRes> {
    return this.http.post<addFavoriteRes>(
      `${this.baseUrl}add`,
      favoriteData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteAllFavorites(): Observable<msgFavorite> {
    return this.http.delete<msgFavorite>(
      `${this.baseUrl}delete/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteFavoriteById(id: number): Observable<msgFavorite> {
    return this.http.delete<msgFavorite>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}