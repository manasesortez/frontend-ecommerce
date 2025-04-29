import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  SocialsResponse,
  SocialResponse,
  CreateSocialResponse,
  UpdateSocialResponse,
  DeleteSocialResponse,
  CreateSocialRequest,
  UpdateSocialRequest,
  Social
} from '../models/socials.models';

@Injectable({
  providedIn: 'root'
})
export class SocialsService {
  private readonly baseUrl = `socials/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with socials service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllSocialsBySubdomain(subdomain: string): Observable<SocialsResponse> {
    return this.http.get<SocialsResponse>(
      `${this.baseUrl}show/${subdomain}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getSocialById(id: number): Observable<SocialResponse> {
    return this.http.get<SocialResponse>(
      `${this.baseUrl}show/id/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createSocial(socialData: CreateSocialRequest): Observable<CreateSocialResponse> {
    return this.http.post<CreateSocialResponse>(
      `${this.baseUrl}add`,
      socialData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateSocial(id: number, socialData: UpdateSocialRequest): Observable<UpdateSocialResponse> {
    return this.http.put<UpdateSocialResponse>(
      `${this.baseUrl}update/${id}`,
      socialData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteSocial(id: number): Observable<DeleteSocialResponse> {
    return this.http.delete<DeleteSocialResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}