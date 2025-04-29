import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { 
  getAllBannerRes,
  getByIdBannerRes,
  banner,
  bannerMessage,
  changeStatusBanner
} from '../models/banners.models';

@Injectable({
  providedIn: 'root'
})
export class BannersService {
  private readonly baseUrl = `banners/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with banners service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllBanners(): Observable<banner[]> {
    return this.http.get<getAllBannerRes>(`${this.baseUrl}show/all`).pipe(
      map(response => response.banners),
      catchError(err => this.handleError(err))
    );
  }

  getBannerById(id: number): Observable<banner> {
    return this.http.get<getByIdBannerRes>(`${this.baseUrl}show/${id}`).pipe(
      map(response => response.banner[0]),
      catchError(err => this.handleError(err))
    );
  }

  createBanner(formData: FormData): Observable<bannerMessage> {
    return this.http.post<bannerMessage>(
      `${this.baseUrl}add`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateBanner(id: number, formData: FormData): Observable<bannerMessage> {
    return this.http.put<bannerMessage>(
      `${this.baseUrl}update/${id}`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteBanner(id: number): Observable<bannerMessage> {
    return this.http.delete<bannerMessage>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  changeBannerStatus(id: number, status: changeStatusBanner): Observable<bannerMessage> {
    return this.http.patch<bannerMessage>(
      `${this.baseUrl}change-status/${id}`,
      { status }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}