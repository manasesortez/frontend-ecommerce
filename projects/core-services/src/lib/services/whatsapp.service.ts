import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {
  WhatsAppQRResponse,
  WhatsAppStatusResponse,
  WhatsAppErrorResponse
} from '../models/whatsapp.models';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  private readonly baseUrl = `whatsapp-qr/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with WhatsApp service';
    
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get WhatsApp QR code for a store
   * @param storeId The store ID
   * @returns Observable with QR code response
   */
  getWhatsAppQR(storeId: string): Observable<WhatsAppQRResponse> {
    return this.http.get<WhatsAppQRResponse>(
      `${this.baseUrl}stores/${storeId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get WhatsApp connection status for a store
   * @param storeId The store ID
   * @returns Observable with status response
   */
  getWhatsAppStatus(storeId: string): Observable<WhatsAppStatusResponse> {
    return this.http.get<WhatsAppStatusResponse>(
      `${this.baseUrl}stores/${storeId}/status`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Poll WhatsApp connection status until ready or timeout
   * @param storeId The store ID
   * @param interval Polling interval in milliseconds (default: 2000)
   * @param timeout Timeout in milliseconds (default: 60000)
   * @returns Observable that completes when ready or errors on timeout
   */
  waitForWhatsAppReady(storeId: string, interval = 2000, timeout = 60000): Observable<WhatsAppStatusResponse> {
    return new Observable(observer => {
      const startTime = Date.now();
      const polling = setInterval(() => {
        this.getWhatsAppStatus(storeId).subscribe({
          next: (status) => {
            if (status.ready) {
              clearInterval(polling);
              observer.next(status);
              observer.complete();
            } else if (Date.now() - startTime > timeout) {
              clearInterval(polling);
              observer.error({
                status: 'error',
                message: 'Timeout waiting for WhatsApp connection'
              });
            }
          },
          error: (err) => {
            clearInterval(polling);
            observer.error(err);
          }
        });
      }, interval);

      return () => clearInterval(polling);
    });
  }
}