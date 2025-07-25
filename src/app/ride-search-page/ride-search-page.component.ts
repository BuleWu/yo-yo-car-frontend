import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {RideSearchComponent} from '../features/rides/components/ride-search/ride-search.component';
import {RideProviderService} from '../features/rides/services/ride-provider-service/ride-provider.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Ride} from '../shared/models/ride/ride-models';
import {AsyncPipe} from '@angular/common';
import {RideCardComponent} from './components/ride-card/ride-card.component';
import {FooterComponent} from '../shared/components/footer/footer.component';

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
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.startingPoint = this._activatedRoute.snapshot.queryParamMap.get('starting_point') as string;
    this.destination = this._activatedRoute.snapshot.queryParamMap.get('destination') as string;

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
  }
}
