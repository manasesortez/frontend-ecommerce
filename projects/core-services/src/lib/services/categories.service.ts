import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  getAllCategories,
  getByIdCategory,
  categories,
  msgCategories,
  addCategory,
  cotegoriesRes
} from '../models/categories.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly baseUrl = `categories/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with categories service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllPublicCategories(subdomain: string): Observable<{categories: categories[], fromCache: boolean}> {
    return this.http.get<getAllCategories>(
      `${this.baseUrl}show/all`,
      { params: { subdomain } }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getCategoryById(id: number): Observable<{category: categories[], fromCache: boolean}> {
    return this.http.get<getByIdCategory>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createCategory(categoryData: addCategory): Observable<cotegoriesRes> {
    return this.http.post<cotegoriesRes>(
      `${this.baseUrl}add`,
      categoryData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateCategory(id: number, categoryData: addCategory): Observable<cotegoriesRes> {
    return this.http.put<cotegoriesRes>(
      `${this.baseUrl}update/${id}`,
      categoryData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteCategory(id: number): Observable<msgCategories> {
    return this.http.delete<msgCategories>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}