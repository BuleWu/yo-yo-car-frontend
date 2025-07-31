import {Component, OnInit} from '@angular/core';
import {UserProviderService} from '../../user-provider-service/user-provider.service';
import {ActivatedRoute} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {User} from '../../../../shared/models/user/user-models';
import {MatIcon} from '@angular/material/icon';
import {RatingProviderService} from '../../../ratings/services/rating-provider.service';
import {MatButton} from '@angular/material/button';
import {EditProfileDialogComponent} from '../edit-profile-dialog/edit-profile-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent,
    MatIcon,
    MatButton,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  public user: User | undefined;
  public noOfRatings: number = 0;
  public userRating: number = 0;
  public currentUserId: string = '';

  constructor(
    private _userProviderService: UserProviderService,
    private _activatedRoute: ActivatedRoute,
    private _ratingProviderService: RatingProviderService,
    private _dialog: MatDialog,
    private _authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    const userId = this._activatedRoute.snapshot.queryParamMap.get('id') as string;
    this.currentUserId = this._authenticationService.getUserId();

    this._userProviderService.getUserById(userId)
      .pipe(untilDestroyed(this))
      .subscribe((user) => this.user = user);

    this._ratingProviderService.getRatingsByUserId(userId)
      .pipe(untilDestroyed(this))
      .subscribe((ratings) => {
        const sum = ratings.reduce((acc, curr) => acc + curr.value, 0)
        this.noOfRatings = ratings.length;
        this.userRating = ratings.length ? sum / this.noOfRatings : 0;
      })
  }

  public openEditProfileDialog() {
   this._dialog.open(EditProfileDialogComponent, {
    minHeight: '70vh',
    maxWidth: 'none',
    width: '60vw',
    data: {
      user: this.user
    }
  })
  }
}
