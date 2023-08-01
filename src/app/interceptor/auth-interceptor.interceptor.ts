import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let commonUrl="https://api.itbook.store/1.0"
    let newRequest=request.clone({
      // setHeaders:{'authHeader':"sampletoken"},
      url:commonUrl+request.url
    }) 
    console.log(newRequest);
    
    return next.handle(newRequest);
  }
}
