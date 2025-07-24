import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthenticationService} from '../features/auth/services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthenticationService);
  const authToken = auth.getAuthorizationToken();
  const authReq = req.clone({ setHeaders: {Authorization: authToken} });

  return next(authReq);
};
