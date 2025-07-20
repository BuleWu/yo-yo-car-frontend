import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {AuthCallbackComponent} from './features/auth/auth-callback/auth-callback.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {authGuard} from './guards/auth-guard/auth.guard';
import {blockAuthGuard} from './guards/block-auth/block-auth.guard';
import {ROUTES} from './shared/enums/router.enum';

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
    path: ROUTES.DASHBOARD,
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth',
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
    path:'**',
    redirectTo: ROUTES.LANDING_PAGE,
    pathMatch: 'full'
  },
];
