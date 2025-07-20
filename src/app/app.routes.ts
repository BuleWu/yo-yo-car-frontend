import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {AuthCallbackComponent} from './features/auth/auth-callback/auth-callback.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {authGuard} from './guards/auth-guard/auth.guard';
/*import {ROUTES} from './shared/enums/router.enum';*/

export const routes: Routes = [
  {
    path: 'welcome',
    /*redirectTo: ROUTES.LANDING_PAGE,*/
    component: HomePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'auth/callback',
    component: AuthCallbackComponent
  }
];
