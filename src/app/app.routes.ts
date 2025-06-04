import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
/*import {ROUTES} from './shared/enums/router.enum';*/

export const routes: Routes = [
  {
    path: 'welcome',
    /*redirectTo: ROUTES.LANDING_PAGE,*/
    component: HomePageComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  }
];
