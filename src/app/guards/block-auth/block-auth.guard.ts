import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from '../../features/auth/services/authentication.service';

export const blockAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(!authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/dashboard');
};
