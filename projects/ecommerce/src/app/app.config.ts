// En cada proyecto (app.config.ts)
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { coreConfig } from 'projects/core-services/src/lib/core.config';

const baseConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration()
  ]
};

export const appConfig: ApplicationConfig = mergeApplicationConfig(baseConfig, coreConfig);