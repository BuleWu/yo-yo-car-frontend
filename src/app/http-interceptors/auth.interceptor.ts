import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../features/auth/services/authentication.service';
import {Observable} from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthenticationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this._authService.getAuthorizationToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    return next.handle(authReq)
  }


}
