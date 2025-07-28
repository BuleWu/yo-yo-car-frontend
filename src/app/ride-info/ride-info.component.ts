import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RideProviderService} from '../features/rides/services/ride-provider-service/ride-provider.service';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {Ride} from '../shared/models/ride/ride-models';
import {DatePipe} from '@angular/common';
import {DurationPipe} from '../shared/pipes/duration.pipe';
import {RatingProviderService} from '../features/ratings/services/rating-provider.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';

@UntilDestroy()
@Component({
  selector: 'app-ride-info',
  imports: [
    FooterComponent,
    DatePipe,
    DurationPipe,
    MatIcon,
    RouterLink,
    MatButton,
    MatDivider,
    NavbarComponent,
  ],
  templateUrl: './ride-info.component.html',
  styleUrl: './ride-info.component.scss'
})
export class RideInfoComponent implements OnInit {
  public ride!: Ride;
  public userRating: number = 0;
  public noOfRatings: number = 0;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _rideProviderService: RideProviderService,
    private _ratingProviderService: RatingProviderService
  ) {
  }

  ngOnInit() {
    const id = this._activatedRoute.snapshot.queryParamMap.get('id') as string;

    this._rideProviderService.getRideById(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (ride) => {
          this.ride = ride;
          this._ratingProviderService.getRatingsByUserId(this.ride.driverId as string)
            .pipe(untilDestroyed(this))
            .subscribe((ratings) => {
              const sum = ratings.reduce((acc, curr) => acc + curr.value, 0)
              this.noOfRatings = ratings.length;
              this.userRating = ratings.length ? sum / this.noOfRatings : 0;
            })
        },
        error: (err) => {
          console.error(err);
          this._router.navigateByUrl('/rides/find-ride');
        }
      })
  }

  public startChat(): void {

  }
}
