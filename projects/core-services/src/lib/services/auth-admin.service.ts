import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { 
  LoginAdmin,
  loginAdminResponse,
  errorLoginAdmin,
  successLoginAdmin,
  updatePasswordAdmin,
  activatePasswordAdmin,
  forgotPasswordadmin
} from '../models/auth-admin.models';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  private readonly baseUrl = 'auth/';

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred during authentication';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  loginAdmin(credentials: LoginAdmin): Observable<loginAdminResponse> {
    return this.http.post<loginAdminResponse>(
      `${this.baseUrl}login/admin`,
      credentials
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  changePasswordAdmin(data: updatePasswordAdmin): Observable<successLoginAdmin> {
    return this.http.put<successLoginAdmin>(
      `${this.baseUrl}update/password/admin`,
      data
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  activateAdmin(data: activatePasswordAdmin): Observable<successLoginAdmin> {
    return this.http.post<successLoginAdmin>(
      `${this.baseUrl}activate/admin`,
      data
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  forgotPasswordAdmin(data: forgotPasswordadmin): Observable<successLoginAdmin> {
    return this.http.post<successLoginAdmin>(
      `${this.baseUrl}forgot-password/admin`,
      data
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}