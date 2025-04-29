import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  RolesResponse,
  RoleResponse,
  CreateRoleResponse,
  UpdateRoleResponse,
  DeleteRoleResponse,
  CreateRoleRequest,
  UpdateRoleRequest,
  Role
} from '../models/roles.models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private readonly baseUrl = `role/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with roles service';
    
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
   * Get all roles (superadmin only)
   * @returns Observable with RolesResponse
   */
  getRoles(): Observable<RolesResponse> {
    return this.http.get<RolesResponse>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific role by ID (superadmin only)
   * @param id Role ID
   * @returns Observable with RoleResponse
   */
  getRoleById(id: number): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new role (superadmin only)
   * @param roleData Role data (name and description)
   * @returns Observable with CreateRoleResponse
   */
  createRole(roleData: CreateRoleRequest): Observable<CreateRoleResponse> {
    return this.http.post<CreateRoleResponse>(
      `${this.baseUrl}add`,
      roleData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update an existing role (superadmin only)
   * @param id Role ID
   * @param roleData Updated role data
   * @returns Observable with UpdateRoleResponse
   */
  updateRole(id: number, roleData: UpdateRoleRequest): Observable<UpdateRoleResponse> {
    return this.http.put<UpdateRoleResponse>(
      `${this.baseUrl}update/${id}`,
      roleData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a role (superadmin only)
   * @param id Role ID
   * @returns Observable with DeleteRoleResponse
   */
  deleteRole(id: number): Observable<DeleteRoleResponse> {
    return this.http.delete<DeleteRoleResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}