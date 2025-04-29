import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { 
  getAllAdmin, 
  getByIdAdmin, 
  admin, 
  errorAdmin, 
  deleteAdmin,
} from '../models/admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public handlerError(err: { message: any; }): Observable<never> {
    let errorMessage = 'An error occurred retrieving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
      if(err.message == "") {
        errorMessage = 'Unknown error occurred';
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  getAllAdmins(): Observable<admin[]> {
    return this.http.get<getAllAdmin>(`admin/show/all`).pipe(
      map(response => response.admin),
      catchError(err => this.handlerError(err))
    );
  }

  getAdminById(id: number): Observable<admin> {
    return this.http.get<getByIdAdmin>(`admin/show/${id}`).pipe(
      map(response => response.admin[0]),
      catchError(err => this.handlerError(err))
    );
  }

  createAdminWithImage(formData: FormData): Observable<{ msg: string, id: number }> {
    return this.http.post<{ msg: string, id: number }>(
      `admin/add`, 
      formData
    ).pipe(
      catchError(err => this.handlerError(err))
    );
  }

  updateAdminWithImage(id: number, formData: FormData): Observable<{ msg: string }> {
    return this.http.put<{ msg: string }>(
      `admin/update/${id}`, 
      formData
    ).pipe(
      catchError(err => this.handlerError(err))
    );
  }

  deleteAdmin(id: number): Observable<deleteAdmin> {
    return this.http.delete<deleteAdmin>(
      `admins/delete/${id}`
    ).pipe(
      catchError(err => this.handlerError(err))
    );
  }
}