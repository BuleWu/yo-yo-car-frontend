import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Ride} from '../../../shared/models/ride/ride-models';
import {RatingProviderService} from '../../../features/ratings/services/rating-provider.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-ride-card',
  imports: [
    MatIcon
  ],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent implements OnInit {
  @Input() ride: Ride | undefined = undefined;

  public userRating?: number;

  constructor(
    private _router: Router,
    private _ratingProviderService: RatingProviderService,
  ) {
  }

  ngOnInit() {
    this._ratingProviderService.getRatingsByUserId(this.ride?.driverId as string)
      .pipe()
      .subscribe((ratings) => {
        const sum = ratings.reduce((acc, curr) => acc + curr.value, 0)
        this.userRating = sum / ratings.length;
      })
  }

  public viewRideDetails(): void {
    const queryParams = {
      id: this.ride?.id
    }
    this._router.navigate(['/rides/ride'], { queryParams });
  }
}
