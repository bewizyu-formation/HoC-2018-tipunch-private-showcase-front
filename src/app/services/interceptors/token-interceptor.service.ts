import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../../user/user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.userService.token) {
      const clone = req.clone({
        setHeaders: {
          'Authorization': this.userService.token,
        }
      });
      return next.handle(clone);
    }
    return next.handle(req);
  }
}
