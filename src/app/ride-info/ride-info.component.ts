import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RideProviderService} from '../features/rides/services/ride-provider-service/ride-provider.service';

@Component({
  selector: 'app-ride-info',
  imports: [
    NavbarComponent
  ],
  templateUrl: './ride-info.component.html',
  styleUrl: './ride-info.component.scss'
})
export class RideInfoComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _rideProviderService: RideProviderService
  ) {
  }

  ngOnInit() {
    const id = this._activatedRoute.snapshot.queryParamMap.get('id') as string;

    this._rideProviderService.getRideById(id)
      .subscribe({
        next: (ride) => console.log('Ride: ', ride),
        error: (err) => {
          console.error(err);
          this._router.navigateByUrl('/rides/find-ride');
        }
      })
  }
}
