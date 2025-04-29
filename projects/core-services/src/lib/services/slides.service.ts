import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  SlidesResponse,
  SlideResponse,
  CreateSlideResponse,
  UpdateSlideResponse,
  DeleteSlideResponse,
  GetSlideParams,
  GetSlidesBySubdomainParams,
  Slide
} from '../models/slides.models';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {
  private readonly baseUrl = `slides/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with slides service';
    
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
   * Get all slides (superadmin only)
   * @returns Observable with SlidesResponse
   */
  getAllSlides(): Observable<SlidesResponse> {
    return this.http.get<SlidesResponse>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get slides by subdomain (public)
   * @param params Subdomain parameter
   * @returns Observable with SlidesResponse
   */
  getSlidesBySubdomain(params: GetSlidesBySubdomainParams): Observable<SlidesResponse> {
    return this.http.get<SlidesResponse>(
      `${this.baseUrl}show/subdomain/${params.subdomain}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific slide by ID (superadmin only)
   * @param params Slide ID parameter
   * @returns Observable with SlideResponse
   */
  getSlideById(params: GetSlideParams): Observable<SlideResponse> {
    return this.http.get<SlideResponse>(
      `${this.baseUrl}show/id/${params.id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new slide (superadmin only)
   * @param formData FormData with slide data and images
   * @returns Observable with CreateSlideResponse
   */
  createSlide(formData: FormData): Observable<CreateSlideResponse> {
    return this.http.post<CreateSlideResponse>(
      `${this.baseUrl}add`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update an existing slide (superadmin only)
   * @param id Slide ID
   * @param formData FormData with updated slide data and images
   * @returns Observable with UpdateSlideResponse
   */
  updateSlide(id: number, formData: FormData): Observable<UpdateSlideResponse> {
    return this.http.put<UpdateSlideResponse>(
      `${this.baseUrl}update/${id}`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a slide (superadmin only)
   * @param id Slide ID
   * @returns Observable with DeleteSlideResponse
   */
  deleteSlide(id: number): Observable<DeleteSlideResponse> {
    return this.http.delete<DeleteSlideResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}