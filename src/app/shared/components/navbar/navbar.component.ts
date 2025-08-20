import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthenticationService} from '../../../features/auth/services/authentication.service';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {UserProviderService} from '../../../features/users/user-provider-service/user-provider.service';
import {NgStyle} from '@angular/common';
import {Router} from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';
import {User} from '../../models/user/user-models';
import {
  EditProfileDialogComponent
} from '../../../features/users/components/edit-profile-dialog/edit-profile-dialog.component';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {take} from 'rxjs';
import {ROUTES} from '../../enums/router.enum';

@UntilDestroy()
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
  public user!: User;

  public profileMenuStyle: any = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    gap: '10px'
  }

  constructor(
    private _authenticationService: AuthenticationService,
    private _userProviderService: UserProviderService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this.isSignedIn = this._authenticationService.isAuthenticated();
  }

  ngOnInit() {
    this._userProviderService.getUserById(this._authenticationService.getUserId())
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe((user) => {
        this.user = user
      })
  }

  public logOutHandler(): void {
    this._authenticationService.logout();
    this._router.navigateByUrl('/auth/login')
  }

  public openEditProfileDialog(): void {
    const dialogRef = this._dialog.open(EditProfileDialogComponent, {
      minHeight: '70vh',
      maxWidth: 'none',
      width: '60vw',
      data: {
        user: this.user
      }
    })
  }

  protected readonly ROUTES = ROUTES;
}
