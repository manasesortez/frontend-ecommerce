import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  ProductComments,
  CommentResponse,
  addProductComment,
  updateProductsComments,
  ProductCommentsMsg,
  changeStatus,
  reportComments,
  reportCommentsMsg
} from '../models/product-comments.models';

@Injectable({
  providedIn: 'root'
})
export class ProductCommentsService {
  private readonly baseUrl = `product-comments/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with product comments service';
    
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
   * Get all product comments with optional filters
   * @param status Filter by status (pending, approved, rejected, flagged)
   * @param productId Filter by product ID
   * @returns Observable with ProductComments
   */
  getAllComments(status?: string, productId?: number): Observable<ProductComments> {
    let params: any = {};
    if (status) params.status = status;
    if (productId) params.productId = productId.toString();

    return this.http.get<ProductComments>(
      `${this.baseUrl}show/all`,
      { params }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific comment by ID
   * @param id Comment ID
   * @returns Observable with CommentResponse
   */
  getCommentById(id: number): Observable<CommentResponse> {
    return this.http.get<CommentResponse>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new product comment
   * @param commentData Comment data including product ID and text
   * @returns Observable with CommentResponse
   */
  createComment(commentData: addProductComment): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      `${this.baseUrl}add`,
      commentData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update an existing comment
   * @param id Comment ID
   * @param commentData Updated comment data
   * @returns Observable with CommentResponse
   */
  updateComment(id: number, commentData: updateProductsComments): Observable<CommentResponse> {
    return this.http.put<CommentResponse>(
      `${this.baseUrl}update/${id}`,
      commentData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a comment
   * @param id Comment ID
   * @returns Observable with ProductCommentsMsg
   */
  deleteComment(id: number): Observable<ProductCommentsMsg> {
    return this.http.delete<ProductCommentsMsg>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Approve or reject a comment (Admin only)
   * @param id Comment ID
   * @param statusData New status and admin notes
   * @returns Observable with CommentResponse
   */
  changeCommentStatus(id: number, statusData: changeStatus): Observable<CommentResponse> {
    return this.http.put<CommentResponse>(
      `${this.baseUrl}${id}/approve`,
      statusData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Like a comment
   * @param id Comment ID
   * @returns Observable with ProductCommentsMsg containing updated like count
   */
  likeComment(id: number): Observable<ProductCommentsMsg> {
    return this.http.post<ProductCommentsMsg>(
      `${this.baseUrl}${id}/like`,
      {}
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Report a comment
   * @param id Comment ID
   * @param reason Optional reason for reporting
   * @returns Observable with reportCommentsMsg containing updated report count
   */
  reportComment(id: number, reason?: string): Observable<reportCommentsMsg> {
    const reportData: any = reason ? { reason } : {};
    
    return this.http.post<reportCommentsMsg>(
      `${this.baseUrl}${id}/report`,
      reportData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}