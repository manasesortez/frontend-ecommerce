import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  StoresResponse,
  StoreResponse,
  CreateStoreResponse,
  UpdateStoreResponse,
  DeleteStoreResponse,
  GetStoresQuery
} from '../models/store.models';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private readonly baseUrl = `stores/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with stores service';
    
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  // Superadmin endpoint - Get all stores with pagination
  getAllStoresForSuperadmin(queryParams?: GetStoresQuery): Observable<StoresResponse> {
    let params = new HttpParams();
    
    if (queryParams?.page) params = params.set('page', queryParams.page);
    if (queryParams?.limit) params = params.set('limit', queryParams.limit);

    return this.http.get<StoresResponse>(
      `${this.baseUrl}show/all/super-admin`,
      { params }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Store owner endpoint - Get stores for current owner
  getStoresForOwner(): Observable<StoreResponse> {
    return this.http.get<StoreResponse>(
      `${this.baseUrl}show/all/store-owner`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Public endpoints
  getPublicStores(queryParams: { subdomain: string, country: string, page?: string, limit?: string }): Observable<StoresResponse> {
    let params = new HttpParams()
      .set('subdomain', queryParams.subdomain)
      .set('country', queryParams.country);
    
    if (queryParams.page) params = params.set('page', queryParams.page);
    if (queryParams.limit) params = params.set('limit', queryParams.limit);

    return this.http.get<StoresResponse>(
      `${this.baseUrl}show/public/all`,
      { params }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getPublicStoreById(id: number): Observable<StoreResponse> {
    return this.http.get<StoreResponse>(
      `${this.baseUrl}show/public/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Store creation
  createStore(storeData: FormData): Observable<CreateStoreResponse> {
    return this.http.post<CreateStoreResponse>(
      `${this.baseUrl}add`,
      storeData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createStoreBySuperadmin(storeData: FormData): Observable<CreateStoreResponse> {
    return this.http.post<CreateStoreResponse>(
      `${this.baseUrl}add/by/superadmin`,
      storeData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Store update
  updateStore(id: number, storeData: FormData): Observable<UpdateStoreResponse> {
    return this.http.put<UpdateStoreResponse>(
      `${this.baseUrl}update/${id}`,
      storeData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Store deletion
  deleteStore(id: number): Observable<DeleteStoreResponse> {
    return this.http.delete<DeleteStoreResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}