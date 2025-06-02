import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './features/auth/login/login.component';
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
  }
];
