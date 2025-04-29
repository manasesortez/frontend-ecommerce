import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  TaxSettingsResponse,
  SingleTaxSettingResponse,
  CreateTaxSettingResponse,
  UpdateTaxSettingResponse,
  DeleteTaxSettingResponse,
  CreateTaxSettingRequest,
  UpdateTaxSettingRequest,
  GetTaxSettingsQuery
} from '../models/tax-settings.models';

@Injectable({
  providedIn: 'root'
})
export class TaxSettingsService {
  private readonly baseUrl = `tax-settings/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with tax settings service';
    
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

  /**
   * Get all tax settings for a specific store
   * @param id_store The store ID
   * @param query Optional query parameters
   * @returns Observable with tax settings response
   */
  getTaxSettingsByStore(id_store: number, query?: GetTaxSettingsQuery): Observable<TaxSettingsResponse> {
    let params: any = {};
    if (query?.active_only) params.active_only = query.active_only.toString();

    return this.http.get<TaxSettingsResponse>(
      `${this.baseUrl}show/by-store/${id_store}`,
      { params }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new tax setting for a store
   * @param id_store The store ID
   * @param taxData Tax setting data to create
   * @returns Observable with create response
   */
  createTaxSetting(id_store: number, taxData: CreateTaxSettingRequest): Observable<CreateTaxSettingResponse> {
    return this.http.post<CreateTaxSettingResponse>(
      `${this.baseUrl}add/by-store/${id_store}`,
      taxData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update an existing tax setting
   * @param id_tax The tax setting ID to update
   * @param updateData Data to update
   * @returns Observable with update response
   */
  updateTaxSetting(id_tax: number, updateData: UpdateTaxSettingRequest): Observable<UpdateTaxSettingResponse> {
    return this.http.put<UpdateTaxSettingResponse>(
      `${this.baseUrl}update/${id_tax}`,
      updateData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a tax setting
   * @param id_tax The tax setting ID to delete
   * @returns Observable with delete response
   */
  deleteTaxSetting(id_tax: number): Observable<DeleteTaxSettingResponse> {
    return this.http.delete<DeleteTaxSettingResponse>(
      `${this.baseUrl}delete/${id_tax}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}