import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { 
  LoginUser,
  loginUserResponse,
  errorLoginUser,
  successLoginUser,
  updatePasswordUser,
  activatePasswordUser,
  forgotPasswordUser
} from '../models/auth-user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
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

  loginUser(credentials: LoginUser): Observable<loginUserResponse> {
    return this.http.post<loginUserResponse>(
      `${this.baseUrl}login/user`,
      credentials
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  changePassword(data: updatePasswordUser): Observable<successLoginUser> {
    return this.http.put<successLoginUser>(
      `${this.baseUrl}update/password/user`,
      data
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  activateUser(data: activatePasswordUser): Observable<successLoginUser> {
    return this.http.post<successLoginUser>(
      `${this.baseUrl}activate/user`,
      data
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  forgotPassword(data: forgotPasswordUser): Observable<successLoginUser> {
    return this.http.post<successLoginUser>(
      `${this.baseUrl}forgot-password/user`,
      data
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // OAuth methods
  loginWithGoogle(): void {
    window.location.href = `${this.baseUrl}google`;
  }

  loginWithGithub(): void {
    window.location.href = `${this.baseUrl}github`;
  }
}