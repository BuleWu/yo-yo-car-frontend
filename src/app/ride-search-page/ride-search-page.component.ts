import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {RideSearchComponent} from '../features/rides/components/ride-search/ride-search.component';
import {RideProviderService} from '../features/rides/services/ride-provider-service/ride-provider.service';
import {ActivatedRoute} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {Ride} from '../shared/models/ride/ride-models';
import {AsyncPipe} from '@angular/common';
import {RideCardComponent} from './components/ride-card/ride-card.component';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {RideSearchFilter} from './enums/enum';
import {AuthenticationService} from '../features/auth/services/authentication.service';
import {RideStatusesEnum} from '../features/rides/enums/enum';

@UntilDestroy()
@Component({
  selector: 'app-ride-search-page',
  imports: [
    NavbarComponent,
    RideSearchComponent,
    AsyncPipe,
    RideCardComponent,
    FooterComponent
  ],
  templateUrl: './ride-search-page.component.html',
  styleUrl: './ride-search-page.component.scss'
})
export class RideSearchPageComponent implements OnInit {
  public rides$: Observable<Ride[]> = of([]);
  public startingPoint: string = '';
  public destination: string = '';

  constructor(
    private _rideProviderService: RideProviderService,
    private _activatedRoute: ActivatedRoute,
    private _authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((params) => {
        this.startingPoint = params['starting_point'];
        this.destination = params['destination'];
        const date = new Date(params['date']);

        this.rides$ = this._rideProviderService.searchRides([
          {
            filter: RideSearchFilter.STARTING_POINT,
            value: this.startingPoint
          },
          {
            filter: RideSearchFilter.DESTINATION,
            value: this.destination
          },
          {
            filter: RideSearchFilter.DATE,
            value: date.toISOString()
          }
        ])
          .pipe(
            map((rides) =>
              rides?.filter((ride) => {
                return ((ride.driverId !== this._authenticationService.getUserId()) && (new Date(ride.startTime).toISOString() > new Date().toISOString()) && (ride.status !== RideStatusesEnum.CANCELLED))
              }) ?? []
            )
          )
    })
  }
}
