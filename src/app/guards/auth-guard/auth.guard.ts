import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from '../../features/auth/services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if(authService.isAuthenticated()) {
    const dashboardPath = router.parseUrl('/dashboard')
    return new RedirectCommand(dashboardPath);
  }

  const loginPath = router.parseUrl('/auth/login')
  return new RedirectCommand(loginPath);
};
