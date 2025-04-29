import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import {
  SubscriptionPlansResponse,
  SinglePlanResponse,
  CreatePlanResponse,
  UpdatePlanResponse,
  DeletePlanResponse,
  SubscriptionPlan
} from '../models/subscription-plans.models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansService {
  private readonly baseUrl = `plans/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with subscription plans service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Get all active subscription plans (public)
   * @returns Observable with array of active subscription plans
   */
  getPublicPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlansResponse>(
      `${this.baseUrl}public/all`
    ).pipe(
      map(response => response.plans),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get a specific active plan by ID (public)
   * @param id Plan ID
   * @returns Observable with subscription plan details
   */
  getPlanById(id: number): Observable<SubscriptionPlan> {
    return this.http.get<SinglePlanResponse>(
      `${this.baseUrl}public/${id}`
    ).pipe(
      map(response => response.plan),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get all plans (superadmin only)
   * @returns Observable with array of all subscription plans
   */
  getAllPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlansResponse>(
      `${this.baseUrl}admin/all`
    ).pipe(
      map(response => response.plans),
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Create a new subscription plan (superadmin only)
   * @param planData Plan data to create
   * @returns Observable with success message and created plan ID
   */
  createPlan(planData: {
    name_plan: string;
    description_plan: string;
    price_plan: number;
    duration_plan: number;
    max_products_plan?: number;
    max_editors?: number;
    max_storage_mb?: number;
    max_images_per_product?: number;
    max_file_size_mb?: number;
    allowed_file_types?: string;
  }): Observable<CreatePlanResponse> {
    return this.http.post<CreatePlanResponse>(
      `${this.baseUrl}admin/add`,
      planData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Update an existing subscription plan (superadmin only)
   * @param id Plan ID to update
   * @param planData Plan data to update
   * @returns Observable with success message
   */
  updatePlan(
    id: number,
    planData: {
      name_plan?: string;
      description_plan?: string;
      price_plan?: number;
      duration_plan?: number;
      status_plan?: number;
      max_products_plan?: number;
      max_editors?: number;
      max_storage_mb?: number;
      max_images_per_product?: number;
      max_file_size_mb?: number;
      allowed_file_types?: string;
    }
  ): Observable<UpdatePlanResponse> {
    return this.http.put<UpdatePlanResponse>(
      `${this.baseUrl}admin/update/${id}`,
      planData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Deactivate a subscription plan (superadmin only)
   * @param id Plan ID to deactivate
   * @returns Observable with success message
   */
  deletePlan(id: number): Observable<DeletePlanResponse> {
    return this.http.delete<DeletePlanResponse>(
      `${this.baseUrl}admin/delete/${id}`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}