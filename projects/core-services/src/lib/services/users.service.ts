import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  UsersResponse,
  SingleUserResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  AuthStatusResponse
} from '../models/users.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `user/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with user service';
    
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
   * Get all users (superadmin only)
   * @returns Observable with users response
   */
  getAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get user by ID
   * @param id User ID
   * @returns Observable with single user response
   */
  getUserById(id: number): Observable<SingleUserResponse> {
    return this.http.get<SingleUserResponse>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new user
   * @param formData FormData with user fields and optional image
   * @returns Observable with create response
   */
  createUser(formData: FormData): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.baseUrl}add`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update a user
   * @param id User ID to update
   * @param formData FormData with updated fields and optional image
   * @returns Observable with update response
   */
  updateUser(id: number, formData: FormData): Observable<UpdateUserResponse> {
    return this.http.put<UpdateUserResponse>(
      `${this.baseUrl}update/${id}`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a user
   * @param id User ID to delete
   * @returns Observable with delete response
   */
  deleteUser(id: number): Observable<DeleteUserResponse> {
    return this.http.delete<DeleteUserResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Check authentication status
   * @returns Observable with auth status response
   */
  checkAuthStatus(): Observable<AuthStatusResponse> {
    return this.http.get<AuthStatusResponse>(
      `${this.baseUrl}auth/status`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Logout user
   * @returns Observable with logout response
   */
  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}logout`,
      {}
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Helper method to prepare FormData for user creation/update
   * @param userData User data object
   * @param imageFile Optional image file
   * @returns Prepared FormData
   */
  prepareUserFormData(userData: {
    name_user: string;
    email_user: string;
    password_user?: string;
    country_user?: string;
    department_user?: string;
    city_user?: string;
    address_user?: string;
    phone_user?: string;
  }, imageFile?: File): FormData {
    const formData = new FormData();

    // Add required fields
    formData.append('name_user', userData.name_user);
    formData.append('email_user', userData.email_user);

    // Add optional fields if they exist
    if (userData.password_user) formData.append('password_user', userData.password_user);
    if (userData.country_user) formData.append('country_user', userData.country_user);
    if (userData.department_user) formData.append('department_user', userData.department_user);
    if (userData.city_user) formData.append('city_user', userData.city_user);
    if (userData.address_user) formData.append('address_user', userData.address_user);
    if (userData.phone_user) formData.append('phone_user', userData.phone_user);

    // Add image if provided
    if (imageFile) formData.append('image_user', imageFile);

    return formData;
  }
}