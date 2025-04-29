import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  ShippingSettingsResponse,
  ShippingSettingsListResponse,
  CreateShippingSettingsResponse,
  UpdateShippingSettingsResponse,
  DeleteShippingSettingsResponse,
  CreateShippingSettingsRequest,
  UpdateShippingSettingsRequest,
  GetShippingSettingsParams,
  ShippingSettings
} from '../models/shipping-settings.models';

@Injectable({
  providedIn: 'root'
})
export class ShippingSettingsService {
  private readonly baseUrl = `shipping-settings/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with shipping settings service';
    
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
   * Get shipping settings for a store
   * @param params Store ID and optional subdomain
   * @returns Observable with ShippingSettingsResponse
   */
  getShippingSettings(params: GetShippingSettingsParams): Observable<ShippingSettingsResponse> {
    let httpParams = new HttpParams()
      .set('id_store', params.id_store);

    if (params.subdomain) {
      httpParams = httpParams.set('subdomain', params.subdomain);
    }

    return this.http.get<ShippingSettingsResponse>(
      `${this.baseUrl}show/${params.id_store}`,
      { params: httpParams }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create new shipping settings for a store
   * @param settingsData Shipping settings data
   * @returns Observable with CreateShippingSettingsResponse
   */
  createShippingSettings(settingsData: CreateShippingSettingsRequest): Observable<CreateShippingSettingsResponse> {
    return this.http.post<CreateShippingSettingsResponse>(
      `${this.baseUrl}add`,
      settingsData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update existing shipping settings
   * @param id Shipping settings ID
   * @param settingsData Updated shipping settings data
   * @returns Observable with UpdateShippingSettingsResponse
   */
  updateShippingSettings(id: number, settingsData: UpdateShippingSettingsRequest): Observable<UpdateShippingSettingsResponse> {
    return this.http.put<UpdateShippingSettingsResponse>(
      `${this.baseUrl}update/${id}`,
      settingsData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete shipping settings
   * @param id Shipping settings ID
   * @returns Observable with DeleteShippingSettingsResponse
   */
  deleteShippingSettings(id: number): Observable<DeleteShippingSettingsResponse> {
    return this.http.delete<DeleteShippingSettingsResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}