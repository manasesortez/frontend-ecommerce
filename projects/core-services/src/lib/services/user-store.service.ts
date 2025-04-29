import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  UserStoreConversationsResponse,
  SingleConversationResponse,
  CreateConversationResponse,
  UpdateConversationResponse,
  UpdateConversationRequest,
  AddRatingRequest,
  GetConversationsQuery,
  UserStoreMessage
} from '../models/users-store-conversations.models';
import { SendMessageResponse, UnreadMessagesResponse } from '../models/user-store-message.models';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly baseUrl = `user-store/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with user-store service';
    
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
  getAllConversationsUserStore(query?: GetConversationsQuery): Observable<UserStoreConversationsResponse> {
    let params = new HttpParams();
    
    if (query) {
      if (query.status) params = params.set('status', query.status);
      if (query.priority) params = params.set('priority', query.priority);
      if (query.sort) params = params.set('sort', query.sort);
      if (query.order) params = params.set('order', query.order);
    }

    return this.http.get<UserStoreConversationsResponse>(
      `${this.baseUrl}conversations/show/all`,
      { params }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getConversationUserStoreById(id: number): Observable<SingleConversationResponse> {
    return this.http.get<SingleConversationResponse>(
      `${this.baseUrl}conversations/show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createConversationUserStore(formData: FormData): Observable<CreateConversationResponse> {
    return this.http.post<CreateConversationResponse>(
      `${this.baseUrl}conversations/add`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateConversationUserStoreStatus(id: number, statusData: UpdateConversationRequest): Observable<UpdateConversationResponse> {
    return this.http.patch<UpdateConversationResponse>(
      `${this.baseUrl}conversations/update/${id}/status`,
      statusData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  addRatingToConversationUserStore(id: number, ratingData: AddRatingRequest): Observable<UpdateConversationResponse> {
    return this.http.patch<UpdateConversationResponse>(
      `${this.baseUrl}conversations/update/${id}/rating`,
      ratingData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Message Methods
  sendMessageUserStore(id: number, formData: FormData): Observable<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(
      `${this.baseUrl}conversations/add/${id}/messages`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getUnreadMessagesCountUserStore(): Observable<UnreadMessagesResponse> {
    return this.http.get<UnreadMessagesResponse>(
      `${this.baseUrl}messages/show/unread`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}