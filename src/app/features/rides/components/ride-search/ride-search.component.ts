import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {ActivatedRoute} from '@angular/router';
import {RideProviderService} from '../../services/ride-provider-service/ride-provider.service';
import {Ride} from '../../../../shared/models/ride/ride-models';
import {Observable, of} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-ride-search',
  imports: [
    NavbarComponent,
    AsyncPipe
  ],
  templateUrl: './ride-search.component.html',
  styleUrl: './ride-search.component.scss'
})
export class RideSearchComponent implements OnInit {
  public rides$: Observable<Ride[]> = of([]);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _rideProviderService: RideProviderService
  ) {}

  ngOnInit(): void {
    const startingPoint = this._activatedRoute.snapshot.queryParamMap.get("starting_point") as string;
    const destination = this._activatedRoute.snapshot.queryParamMap.get("destination") as string;

    // TODO: add enum for filter
    this.rides$ = this._rideProviderService
      .searchRides([
        {
          filter: "starting_point",
          value: startingPoint
        }, {
          filter: "destination",
          value: destination
        }
        ])
  }

}
