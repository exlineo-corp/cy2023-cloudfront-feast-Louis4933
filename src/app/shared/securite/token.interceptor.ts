import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  entetes:any;

  constructor(private user: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.user.isLoggedIn && this.user.profil.token!.length>0){
      this.entetes = {
        headers: new HttpHeaders(
          {'Authorization' : 'Bearer ' + this.user.profil.token}
        )
      };
      const httpToken = request.clone(this.entetes);
      return next.handle(httpToken);
    }else{
      return next.handle(request);
    }

  }
}
