import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  TemplatesResponse,
  SingleTemplateResponse,
  CreateTemplateResponse,
  UpdateTemplateResponse,
  DeleteTemplateResponse,
  Template,
  GetTemplatesQuery
} from '../models/templates.models';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  private readonly baseUrl = `templates/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with templates service';
    
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
   * Get all templates (superadmin only)
   * @returns Observable with templates response
   */
  getAllTemplates(): Observable<TemplatesResponse> {
    return this.http.get<TemplatesResponse>(
      `${this.baseUrl}show/all`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get template by subdomain (public endpoint)
   * @param subdomain The subdomain to search for
   * @returns Observable with single template response
   */
  getTemplateBySubdomain(subdomain: string): Observable<SingleTemplateResponse> {
    return this.http.get<SingleTemplateResponse>(
      `${this.baseUrl}show/subdomain/${subdomain}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get template by ID (superadmin only)
   * @param id Template ID
   * @returns Observable with single template response
   */
  getTemplateById(id: number): Observable<SingleTemplateResponse> {
    return this.http.get<SingleTemplateResponse>(
      `${this.baseUrl}show/id/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new template (superadmin only)
   * @param formData FormData with template fields and files
   * @returns Observable with create response
   */
  createTemplate(formData: FormData): Observable<CreateTemplateResponse> {
    return this.http.post<CreateTemplateResponse>(
      `${this.baseUrl}add`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update a template (superadmin only)
   * @param id Template ID to update
   * @param formData FormData with updated fields and files
   * @returns Observable with update response
   */
  updateTemplate(id: number, formData: FormData): Observable<UpdateTemplateResponse> {
    return this.http.put<UpdateTemplateResponse>(
      `${this.baseUrl}update/${id}`,
      formData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Delete a template (superadmin only)
   * @param id Template ID to delete
   * @returns Observable with delete response
   */
  deleteTemplate(id: number): Observable<DeleteTemplateResponse> {
    return this.http.delete<DeleteTemplateResponse>(
      `${this.baseUrl}delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Helper method to prepare FormData for template creation/update
   * @param templateData Template data object
   * @param files Optional files object with logo, icon, cover
   * @returns Prepared FormData
   */
  prepareTemplateFormData(templateData: Partial<Template>, files?: {
    logo_template?: File;
    icon_template?: File;
    cover_template?: File;
  }): FormData {
    const formData = new FormData();

    // Add text fields
    if (templateData.title_template) formData.append('title_template', templateData.title_template);
    if (templateData.description_template) formData.append('description_template', templateData.description_template);
    if (templateData.keywords_template) formData.append('keywords_template', templateData.keywords_template);
    if (templateData.fonts_template) formData.append('fonts_template', templateData.fonts_template);
    if (templateData.colors_template) formData.append('colors_template', templateData.colors_template);
    if (templateData.subdomain) formData.append('subdomain', templateData.subdomain);
    if (templateData.active_template) formData.append('active_template', templateData.active_template.toString() as any);

    // Add files
    if (files?.logo_template) formData.append('logo_template', files.logo_template);
    if (files?.icon_template) formData.append('icon_template', files.icon_template);
    if (files?.cover_template) formData.append('cover_template', files.cover_template);

    return formData;
  }
}