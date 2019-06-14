import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpResponse,HttpEvent,
  HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './core/services/login/login.service';
import { AuthService } from './core/services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService:LoginService,
              private authService:AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get token function is a getter function with localStorage.getItem('access_token');
    const token: string = this.authService.getToken;

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    }

    return next.handle(request).pipe(
     map((event: HttpEvent<any>) => {
       if (event instanceof HttpResponse) {
         if (event.status === 401 || event.status === 403) {
           this.loginService.doLogOut();
           return;
         }
       }
       return event;
     }));
  }
}