import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {MatDivider} from '@angular/material/divider';
import {TimeAgoPipe} from '../../../../shared/pipes/time-ago-pipe/time-ago.pipe';
import {ROUTES} from '../../../../shared/enums/router.enum';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RideProviderService} from '../../services/ride-provider-service/ride-provider.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Ride} from '../../../../shared/models/ride/ride-models';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-user-rides',
  imports: [
    NavbarComponent,
    MatDivider,
    MatIcon,
    TimeAgoPipe,
    RouterLink,
    DatePipe
  ],
  templateUrl: './user-rides.component.html',
  styleUrl: './user-rides.component.scss'
})
export class UserRidesComponent implements OnInit {
  public ROUTES = ROUTES;

  rides: Ride[] = [];

  constructor(
    private _rideProviderService: RideProviderService,
    private _authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this._rideProviderService.getUserRides(this._authenticationService.getUserId())
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((rides) => this.rides = rides)
  }
}
