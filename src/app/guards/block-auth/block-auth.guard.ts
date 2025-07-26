import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from '../../features/auth/services/authentication.service';
import {ROUTES} from '../../shared/enums/router.enum';

export const blockAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(!authService.isAuthenticated()) {
    return true;
  }

  return router.parseUrl(`/${ROUTES.FIND_RIDE}`);
};
