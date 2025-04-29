import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import {
  StorageUsageResponse,
  StorageUsageWithRelations,
  CurrentUsage,
  StorageLimits
} from '../models/store-storage.models';

@Injectable({
  providedIn: 'root'
})
export class StoreStorageService {
  private readonly baseUrl = `store-storage/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with store storage service';
    
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
   * Get storage usage summary for a specific store
   * @param storeId The ID of the store
   * @returns Observable with storage usage summary
   */
  getUsageSummary(storeId: number): Observable<{
    planLimits: StorageLimits;
    currentUsage: CurrentUsage;
    lastCalculated: string;
  }> {
    return this.http.get<StorageUsageResponse>(
      `${this.baseUrl}show/usage/${storeId}`
    ).pipe(
      map(response => ({
        planLimits: response.planLimits!,
        currentUsage: response.currentUsage!,
        lastCalculated: response.lastCalculated as string
      })),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get storage usage for the current store owner
   * @returns Observable with storage usage data
   */
  getAdminStorageUsage(): Observable<StorageUsageWithRelations> {
    return this.http.get<StorageUsageResponse>(
      `${this.baseUrl}show/all/store-owner`
    ).pipe(
      map(response => response.usage!),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get all storage usage records (superadmin only)
   * @returns Observable with array of storage usage records
   */
  getAllStorageUsage(): Observable<StorageUsageWithRelations[]> {
    return this.http.get<StorageUsageResponse>(
      `${this.baseUrl}show/all`
    ).pipe(
      map(response => response.usages!),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get specific storage usage record by ID
   * @param id The ID of the storage usage record
   * @returns Observable with storage usage data
   */
  getStorageUsageById(id: number): Observable<StorageUsageWithRelations> {
    return this.http.get<StorageUsageResponse>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      map(response => response.usage!),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a storage usage record (superadmin only)
   * @param id The ID of the record to delete
   * @returns Observable with success message
   */
  deleteStorageUsage(id: number): Observable<{ msg: string }> {
    return this.http.delete<StorageUsageResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      map(response => ({ msg: response.msg! })),
      catchError(err => this.handleError(err))
    );
  }
}