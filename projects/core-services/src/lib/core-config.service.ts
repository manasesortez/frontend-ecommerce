// projects/core/src/lib/core-config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreConfigService {
  private config = {
    apiBaseUrl: 'https://localhost:8080/',
    skipInterception: ['http://', 'https://', 'assets/'],
    environment: 'development'
  };

  init(config: Partial<typeof this.config>) {
    const apiBaseUrl = config.apiBaseUrl?.endsWith('/') 
      ? config.apiBaseUrl 
      : `${config.apiBaseUrl}/`;
    
    this.config = { 
      ...this.config, 
      ...config,
      apiBaseUrl
    };
  }

  shouldIntercept(url: string): boolean {
    return !this.config.skipInterception.some(pattern => url.startsWith(pattern));
  }

  getFullUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') 
      ? endpoint.substring(1) 
      : endpoint;
      
    return `${this.config.apiBaseUrl}${cleanEndpoint}`;
  }
}