import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  GetAllPermissions,
  GetByIdRolePermissions,
  GetByIdPermissions,
  addPermissions,
  addPermissionsRes,
  updatePermissions,
  updatePermissionsRes,
  msgPermissions,
  permissionsChangeStatus
} from '../models/permissions.models';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private readonly baseUrl = `permissions/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with permissions service';
    
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
   * Get all permissions
   * @returns Observable with list of all permissions
   */
  getAllPermissions(): Observable<GetAllPermissions> {
    return this.http.get<GetAllPermissions>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get permissions by role ID
   * @param roleId The ID of the role
   * @returns Observable with permissions for the specified role
   */
  getPermissionsByRole(roleId: number): Observable<GetByIdRolePermissions> {
    return this.http.get<GetByIdRolePermissions>(
      `${this.baseUrl}show/role/${roleId}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific permission by ID
   * @param id Permission ID
   * @returns Observable with the permission data
   */
  getPermissionById(id: number): Observable<GetByIdPermissions> {
    return this.http.get<GetByIdPermissions>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new permission
   * @param permissionData Permission data to create
   * @returns Observable with the creation result
   */
  createPermission(permissionData: addPermissions): Observable<addPermissionsRes> {
    return this.http.post<addPermissionsRes>(
      `${this.baseUrl}add`,
      permissionData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update an existing permission
   * @param id Permission ID to update
   * @param permissionData Updated permission data
   * @returns Observable with the update result
   */
  updatePermission(id: number, permissionData: updatePermissions): Observable<updatePermissionsRes> {
    return this.http.put<updatePermissionsRes>(
      `${this.baseUrl}update/${id}`,
      permissionData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a permission
   * @param id Permission ID to delete
   * @returns Observable with the deletion result
   */
  deletePermission(id: number): Observable<msgPermissions> {
    return this.http.delete<msgPermissions>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Change a specific permission status
   * @param id Permission ID
   * @param statusData Object containing field and value to update
   * @returns Observable with the status change result
   */
  changePermissionStatus(id: number, statusData: permissionsChangeStatus): Observable<msgPermissions> {
    return this.http.patch<msgPermissions>(
      `${this.baseUrl}change-status/${id}`,
      statusData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}