import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthenticationService} from '../../../features/auth/services/authentication.service';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {UserProviderService} from '../../../features/users/user-provider-service/user-provider.service';
import {NgStyle} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    NgStyle,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public isSignedIn: boolean = false;
  public profilePictureUrl: string = '';

  public profileMenuStyle: any = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    gap: '10px'
  }

  constructor(
    private _authenticationService: AuthenticationService,
    private _userProviderService: UserProviderService,
    private _router: Router
  ) {
    this.isSignedIn = this._authenticationService.isAuthenticated();
  }

  ngOnInit() {
    this._userProviderService.getUserById(this._authenticationService.getUserId()) // TODO: add unsubscribe
      .subscribe((user) => {
        this.profilePictureUrl = user.profilePicture
        console.log(this.profilePictureUrl)
      })
  }

  public logOutHandler(): void {
    this._authenticationService.logout();
    this._router.navigateByUrl('/auth/login')
  }
}
