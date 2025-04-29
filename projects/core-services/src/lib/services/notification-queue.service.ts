import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  getAllNotificationRes,
  getByIdNotificationRes,
  deleteNotificationAll,
  deleteNotificationUnique
} from '../models/notifications.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationQueueService {
  private readonly baseUrl = `notification-queue/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with notification queue service';
    
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
   * Get all notifications for the authenticated store owner
   * @returns Observable with all notifications
   */
  getAllNotifications(): Observable<getAllNotificationRes> {
    return this.http.get<getAllNotificationRes>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific notification by ID
   * @param id Notification ID
   * @returns Observable with the notification
   */
  getNotificationById(id: number): Observable<getByIdNotificationRes> {
    return this.http.get<getByIdNotificationRes>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete all notifications for the authenticated store owner
   * @returns Observable with deletion result
   */
  deleteAllNotifications(): Observable<deleteNotificationAll> {
    return this.http.delete<deleteNotificationAll>(
      `${this.baseUrl}delete/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a specific notification by ID
   * @param id Notification ID
   * @returns Observable with deletion result
   */
  deleteNotificationById(id: number): Observable<deleteNotificationUnique> {
    return this.http.delete<deleteNotificationUnique>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}