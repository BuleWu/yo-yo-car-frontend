import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {AuthCallbackComponent} from './features/auth/auth-callback/auth-callback.component';
import {authGuard} from './guards/auth-guard/auth.guard';
import {blockAuthGuard} from './guards/block-auth/block-auth.guard';
import {ROUTES} from './shared/enums/router.enum';
import {FindRidePageComponent} from './find-ride-page/find-ride-page.component';
import {RideSearchPageComponent} from './ride-search-page/ride-search-page.component';
import {RideInfoComponent} from './ride-info/ride-info.component';
import {PostRideComponent} from './features/rides/components/post-ride/post-ride.component';
import {UserRatingsComponent} from './features/users/components/user-ratings/user-ratings.component';
import {UserProfileComponent} from './features/users/components/user-profile/user-profile.component';
import {ChatComponent} from './features/chats/components/chat/chat.component';
import {UserChatsComponent} from './features/chats/components/user-chats/user-chats.component';
import {UserRidesComponent} from './features/rides/components/user-rides/user-rides.component';

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
    path: ROUTES.FIND_RIDE,
    component: FindRidePageComponent,
    canActivate: [authGuard]
  },
  {
    path: ROUTES.RIDES,
    children: [
      {
        path: ROUTES.SEARCH,
        component: RideSearchPageComponent,
        canActivate: [authGuard]
      },
      {
        path: ROUTES.RIDE,
        component: RideInfoComponent,
        canActivate: [authGuard]
      },
      {
        path: ROUTES.POST,
        component: PostRideComponent,
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: ROUTES.USER,
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: `${ROUTES.USER}/:id`,
    children: [
      {
        path: ROUTES.RATINGS,
        component: UserRatingsComponent,
        canActivate: [authGuard],
      },
      {
        path: ROUTES.CHATS,
        component: UserChatsComponent,
        canActivate: [authGuard]
      },
      {
        path: ROUTES.RIDES,
        component: UserRidesComponent,
        canActivate: [authGuard],
      }
    ]
  },
  {
    path: `${ROUTES.USER}/:id/${ROUTES.RIDES}`,
    component: UserRidesComponent,
    canActivate: [authGuard],
  },
  {
    path: `${ROUTES.CHATS}/:id`,
    component: ChatComponent,
    canActivate: [authGuard]
  },
  {
    path:'**',
    redirectTo: ROUTES.LANDING_PAGE,
    pathMatch: 'full'
  },
];
