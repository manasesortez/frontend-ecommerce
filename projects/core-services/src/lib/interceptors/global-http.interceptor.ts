import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { CoreConfigService } from '../core-config.service';

export const globalHttpInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const config = inject(CoreConfigService);
  
  let newReq = req;
  if (config.shouldIntercept(req.url)) {
    newReq = req.clone({
      url: config.getFullUrl(req.url)
    });
  }

  const token = localStorage.getItem('auth-token') || 
                localStorage.getItem('login-token-admin') ||
                localStorage.getItem('login-token-user');

  if (token) {
    newReq = newReq.clone({
      headers: newReq.headers.set('login-token', `${token}`)
    });
  }
  
  return next(newReq);
};
