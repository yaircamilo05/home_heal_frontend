import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

const ADD_TOKEN = new HttpContextToken<boolean>(() => false);

export function addToken() {
  return new HttpContext().set(ADD_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(ADD_TOKEN)) {
      return this.addTokenToRequest(request, next);
    }
    return next.handle(request);
  }

  private addTokenToRequest(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.storageService.getToken();
    if (token) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
