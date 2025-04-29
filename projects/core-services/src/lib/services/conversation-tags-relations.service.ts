import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  getAllConversationTagsRelationsRes,
  getByIdConversationTagsRelationsRes,
  relations
} from '../models/conversation-tags-relations.models';

@Injectable({
  providedIn: 'root'
})
export class ConversationTagsRelationsService {
  private readonly baseUrl = `conversations-tags-relations/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with conversation tag relations service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllTagRelations(): Observable<getAllConversationTagsRelationsRes> {
    return this.http.get<getAllConversationTagsRelationsRes>(
      `${this.baseUrl}tags/relations/show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getTagRelationsByConversation(conversationId: number): Observable<getByIdConversationTagsRelationsRes> {
    return this.http.get<getByIdConversationTagsRelationsRes>(
      `${this.baseUrl}tags/relations/show/${conversationId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  addTagToConversation(conversationId: number, tagId: number): Observable<relations> {
    return this.http.post<relations>(
      `${this.baseUrl}add/${conversationId}/tags/${tagId}`,
      {}
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  removeTagFromConversation(conversationId: number, tagId: number): Observable<{msg: string}> {
    return this.http.delete<{msg: string}>(
      `${this.baseUrl}delete/${conversationId}/tags/${tagId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}