import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  getAllModulesRes,
  getByIdModuleRes,
  modules,
  addModules,
  addModulesResponse
} from '../models/modules.models';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private readonly baseUrl = `modules/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with modules service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  getAllModules(): Observable<getAllModulesRes> {
    return this.http.get<getAllModulesRes>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getModuleById(id: number): Observable<getByIdModuleRes> {
    return this.http.get<getByIdModuleRes>(
      `${this.baseUrl}show/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createModule(moduleData: addModules): Observable<addModulesResponse> {
    return this.http.post<addModulesResponse>(
      `${this.baseUrl}add`,
      moduleData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateModule(id: number, moduleData: addModules): Observable<addModulesResponse> {
    return this.http.put<addModulesResponse>(
      `${this.baseUrl}update/${id}`,
      moduleData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteModule(id: number): Observable<{msg: string}> {
    return this.http.delete<{msg: string}>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}