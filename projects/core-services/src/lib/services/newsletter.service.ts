import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {
  subscribersRes,
  newsletterMessage,
  templatesRes,
  campaignsRes,
  addSubscribe,
  addSubscribeRes,
  unSubscribe,
  unSubscribeRes,
  addTemplate,
  addTemplateRes,
  addCampaign,
  addCampaignRes
} from '../models/newsletter.models';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private readonly baseUrl = `newsletter/`;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred with newsletter service';
    
    if (error?.error?.msg) {
      errorMessage = error.error.msg;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }

    return throwError(() => new Error(errorMessage));
  }

  // Subscription Management
  subscribeToNewsletter(subscriberData: addSubscribe): Observable<addSubscribeRes> {
    return this.http.post<addSubscribeRes>(
      `${this.baseUrl}subscribe/add`,
      subscriberData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  unsubscribeFromNewsletter(unsubscribeData: unSubscribe): Observable<unSubscribeRes> {
    return this.http.post<unSubscribeRes>(
      `${this.baseUrl}unsubscribe/remove`,
      unsubscribeData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Templates Management
  createTemplate(templateData: addTemplate): Observable<addTemplateRes> {
    return this.http.post<addTemplateRes>(
      `${this.baseUrl}templates/add`,
      templateData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getTemplates(): Observable<templatesRes> {
    return this.http.get<templatesRes>(
      `${this.baseUrl}template/show`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Campaigns Management
  createCampaign(campaignData: addCampaign): Observable<addCampaignRes> {
    return this.http.post<addCampaignRes>(
      `${this.baseUrl}campaigns/add`,
      campaignData
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getCampaigns(): Observable<campaignsRes> {
    return this.http.get<campaignsRes>(
      `${this.baseUrl}campaigns/show`
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }

  // Subscribers Management
  getSubscribers(page: number = 1, pageSize: number = 100): Observable<subscribersRes> {
    return this.http.get<subscribersRes>(
      `${this.baseUrl}subscribers/show`,
      {
        params: {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      }
    ).pipe(
      catchError(err => this.handleError(err))
    );
  }
}