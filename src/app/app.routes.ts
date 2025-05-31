import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ROUTES} from './shared/enums/router.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.LANDING_PAGE,
    component: HomePageComponent
  }
];
