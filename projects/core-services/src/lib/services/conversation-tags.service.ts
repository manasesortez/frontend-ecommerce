import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  getAllConversationTags,
  getByIdConversationTags,
  tags,
  msgConversationTag,
  addConversationTag,
  conversationTagRes
} from '../models/conversation-tags.models';

@Injectable({
  providedIn: 'root'
})
export class ConversationTagsService {
  private readonly baseUrl = `conversation-tags/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with conversation tags service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllTags(): Observable<getAllConversationTags> {
    return this.http.get<getAllConversationTags>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getTagById(id: number): Observable<getByIdConversationTags> {
    return this.http.get<getByIdConversationTags>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createTag(tagData: addConversationTag): Observable<conversationTagRes> {
    return this.http.post<conversationTagRes>(
      `${this.baseUrl}add`,
      tagData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateTag(id: number, tagData: addConversationTag): Observable<conversationTagRes> {
    return this.http.put<conversationTagRes>(
      `${this.baseUrl}update/${id}`,
      tagData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteTag(id: number): Observable<msgConversationTag> {
    return this.http.delete<msgConversationTag>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}