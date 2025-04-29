import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  UserAccessesResponse,
  UserInactiveAccessesResponse,
  UpdateAccessResponse,
  DeleteAccessResponse,
  UpdateAccessRequest
} from '../models/user-subdomain-access.models';

@Injectable({
  providedIn: 'root'
})
export class UserSubdomainAccessService {
  private readonly baseUrl = `user-subdomain-access/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with user subdomain access service';
    
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
   * Get all active accesses (superadmin only)
   * @returns Observable with active accesses response
   */
  getAllActiveAccesses(): Observable<UserAccessesResponse> {
    return this.http.get<UserAccessesResponse>(
      `${this.baseUrl}show/active/admin`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get all inactive accesses (superadmin only)
   * @returns Observable with inactive accesses response
   */
  getAllInactiveAccesses(): Observable<UserInactiveAccessesResponse> {
    return this.http.get<UserInactiveAccessesResponse>(
      `${this.baseUrl}show/inactive/admin`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get current user's active accesses (store owner)
   * @returns Observable with user's active accesses
   */
  getMyActiveAccesses(): Observable<UserAccessesResponse> {
    return this.http.get<UserAccessesResponse>(
      `${this.baseUrl}show/active/store_owner`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get current user's inactive accesses (store owner)
   * @returns Observable with user's inactive accesses
   */
  getMyInactiveAccesses(): Observable<UserInactiveAccessesResponse> {
    return this.http.get<UserInactiveAccessesResponse>(
      `${this.baseUrl}show/inactive/store_owner`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update access record (superadmin only)
   * @param id Access record ID
   * @param updateData Data to update
   * @returns Observable with update response
   */
  updateAccess(id: number, updateData: UpdateAccessRequest): Observable<UpdateAccessResponse> {
    return this.http.put<UpdateAccessResponse>(
      `${this.baseUrl}admin/update/${id}`,
      updateData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete access record (superadmin only)
   * @param id Access record ID
   * @returns Observable with delete response
   */
  deleteAccess(id: number): Observable<DeleteAccessResponse> {
    return this.http.delete<DeleteAccessResponse>(
      `${this.baseUrl}admin/delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}