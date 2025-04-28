import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalHttpInterceptorFn } from './interceptors/global-http.interceptor';
import { CoreConfigService } from './core-config.service';
import { AdminService } from 'shared-services';

export const coreConfig: ApplicationConfig = {
  providers: [
    CoreConfigService,
    AdminService,
    provideHttpClient(
      withInterceptors([globalHttpInterceptorFn])
    )
  ]
};