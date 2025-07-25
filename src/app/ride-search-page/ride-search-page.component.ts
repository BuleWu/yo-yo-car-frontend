import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {RideSearchComponent} from '../features/rides/components/ride-search/ride-search.component';
import {RideProviderService} from '../features/rides/services/ride-provider-service/ride-provider.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Ride} from '../shared/models/ride/ride-models';
import {AsyncPipe} from '@angular/common';
import {RideCardComponent} from './components/ride-card/ride-card.component';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

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
export class RideSearchPageComponent implements OnInit, OnDestroy {
  public rides$: Observable<Ride[]> = of([]);
  public startingPoint: string = '';
  public destination: string = '';

  constructor(
    private _rideProviderService: RideProviderService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.startingPoint = params['starting_point'];
        this.destination = params['destination'];

        this.rides$ = this._rideProviderService.searchRides([
          {
            filter: 'starting_point',
            value: this.startingPoint
          },
          {
            filter: 'destination',
            value: this.destination
          }
        ])
    })
  }

  ngOnDestroy(): void {}
}
