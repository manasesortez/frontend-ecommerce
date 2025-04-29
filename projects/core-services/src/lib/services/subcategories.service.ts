import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import {
  SubcategoriesResponse,
  SubcategoryResponse,
  CreateSubcategoryResponse,
  UpdateSubcategoryResponse,
  DeleteSubcategoryResponse,
  Subcategory,
  SubcategoryWithCategory,
  GetSubcategoriesQuery
} from '../models/subcategories.models';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private readonly baseUrl = `subcategories/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with subcategories service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get all public subcategories for a specific subdomain and category
   * @param queryParams Object containing subdomain and category_id
   * @returns Observable with array of subcategories and cache status
   */
  getPublicSubcategories(queryParams: GetSubcategoriesQuery): Observable<{
    subcategories: SubcategoryWithCategory[];
    fromCache?: boolean;
  }> {
    let params = new HttpParams()
      .set('subdomain', queryParams.subdomain)
      .set('category_id', queryParams.category_id);

    return this.http.get<SubcategoriesResponse>(
      `${this.baseUrl}show/all`,
      { params }
    ).pipe(
      map(response => ({
        subcategories: response.subcategories,
        fromCache: response.fromCache
      })),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific subcategory by ID
   * @param id The ID of the subcategory
   * @returns Observable with subcategory details and cache status
   */
  getSubcategoryById(id: number): Observable<{
    subcategory: SubcategoryWithCategory;
    fromCache?: boolean;
  }> {
    return this.http.get<SubcategoryResponse>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      map(response => ({
        subcategory: response.subcategory,
        fromCache: response.fromCache
      })),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new subcategory (superadmin only)
   * @param subcategoryData The subcategory data to create
   * @returns Observable with success message and created subcategory
   */
  createSubcategory(subcategoryData: {
    name_sub_category: string;
    subdomain: string;
    id_category: number;
    icon_sub_category?: string;
  }): Observable<CreateSubcategoryResponse> {
    return this.http.post<CreateSubcategoryResponse>(
      `${this.baseUrl}add`,
      subcategoryData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update an existing subcategory (superadmin only)
   * @param id The ID of the subcategory to update
   * @param subcategoryData The updated subcategory data
   * @returns Observable with success message and updated subcategory
   */
  updateSubcategory(
    id: number,
    subcategoryData: {
      name_sub_category?: string;
      subdomain?: string;
      id_category?: number;
      icon_sub_category?: string | null;
    }
  ): Observable<UpdateSubcategoryResponse> {
    return this.http.put<UpdateSubcategoryResponse>(
      `${this.baseUrl}update/${id}`,
      subcategoryData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a subcategory (superadmin only)
   * @param id The ID of the subcategory to delete
   * @returns Observable with success message
   */
  deleteSubcategory(id: number): Observable<DeleteSubcategoryResponse> {
    return this.http.delete<DeleteSubcategoryResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}