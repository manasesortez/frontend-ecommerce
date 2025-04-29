import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  SupportConversationsResponse,
  SingleConversationResponse,
  CreateConversationResponse,
  UpdateConversationResponse,
  UpdateConversationStatusRequest,
  AssignAdminRequest,
  GetConversationsQuery,

} from '../models/support-conversations.models';
import { SendMessageResponse, MarkMessagesReadResponse, UnreadMessagesCountResponse } from '../models/support-messages.models';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private readonly baseUrl = `support-admin/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with support service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

 // Conversation Methods
 getAllConversationsSupport(query?: GetConversationsQuery): Observable<SupportConversationsResponse> {
    let params = new HttpParams();
    
    if (query) {
      if (query.status) params = params.set('status', query.status);
      if (query.priority) params = params.set('priority', query.priority);
      if (query.sort) params = params.set('sort', query.sort);
      if (query.order) params = params.set('order', query.order);
    }

    return this.http.get<SupportConversationsResponse>(
      `${this.baseUrl}conversations/show/all`,
      { params }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }


  getConversationSupportById(id: number): Observable<SingleConversationResponse> {
    return this.http.get<SingleConversationResponse>(
      `${this.baseUrl}conversations/show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createConversationSupport(formData: FormData): Observable<CreateConversationResponse> {
    return this.http.post<CreateConversationResponse>(
      `${this.baseUrl}conversations/add`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateConversationStatusSupport(id: number, statusData: UpdateConversationStatusRequest): Observable<UpdateConversationResponse> {
    return this.http.patch<UpdateConversationResponse>(
      `${this.baseUrl}conversations/update/${id}/status`,
      statusData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  assignAdminToConversationSupport(id: number, adminData: AssignAdminRequest): Observable<UpdateConversationResponse> {
    return this.http.patch<UpdateConversationResponse>(
      `${this.baseUrl}conversations/change/${id}/assign`,
      adminData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Message Methods
  sendMessageSupport(id: number, formData: FormData): Observable<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      `${this.baseUrl}conversations/add/${id}/messages`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  markMessagesAsReadSupport(id: number): Observable<MarkMessagesReadResponse> {
    return this.http.patch<MarkMessagesReadResponse>(
      `${this.baseUrl}conversations/update/${id}/messages/read`,
      {}
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getUnreadMessagesCountSupport(): Observable<UnreadMessagesCountResponse> {
    return this.http.get<UnreadMessagesCountResponse>(
      `${this.baseUrl}messages/show/unread`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}