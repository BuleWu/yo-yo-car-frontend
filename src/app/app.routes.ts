import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {AuthCallbackComponent} from './features/auth/auth-callback/auth-callback.component';
import {authGuard} from './guards/auth-guard/auth.guard';
import {blockAuthGuard} from './guards/block-auth/block-auth.guard';
import {ROUTES} from './shared/enums/router.enum';
import {FindRidePageComponent} from './find-ride-page/find-ride-page.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo: ROUTES.LANDING_PAGE,
    pathMatch: 'full'
  },
  {
    path: ROUTES.LANDING_PAGE,
    component: HomePageComponent,
    canActivate: [blockAuthGuard]
  },
  {
    path: ROUTES.AUTH,
    children: [
      {
        path: ROUTES.LOGIN_PAGE,
        component: LoginComponent,
        canActivate: [blockAuthGuard]
      },
      {
        path: ROUTES.REGISTER_PAGE,
        component: RegisterComponent,
        canActivate: [blockAuthGuard]
      },
      {
        path: ROUTES.AUTH_CALLBACK,
        component: AuthCallbackComponent,
        canActivate: [blockAuthGuard]
      }
    ]
  },
  {
    path: ROUTES.RIDE,
    children: [
      {
        path: ROUTES.FIND,
        component: FindRidePageComponent,
        canActivate: [authGuard]
      },
     /* {
        path: ROUTES.POST,
        /!*component:*!/
        canActivate: [authGuard]
      }*/
    ]
  },
  {
    path:'**',
    redirectTo: ROUTES.LANDING_PAGE,
    pathMatch: 'full'
  },
];
