import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class Auth401Interceptor implements HttpInterceptor {

  constructor(private user: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      erreur => {
        if(erreur instanceof HttpErrorResponse && erreur.status === 401){
          this.user.isLoggedIn = false;
          this.router.navigateByUrl('/connexion');
        }
        return erreur;
      }
    );
  }
}
