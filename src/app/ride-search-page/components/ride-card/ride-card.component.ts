import {Component, Input} from '@angular/core';
import {User} from '../../../shared/models/user/user-models';
import {Router} from '@angular/router';
import {Ride} from '../../../shared/models/ride/ride-models';

@Component({
  selector: 'app-ride-card',
  imports: [],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent {
  @Input() ride: Ride | undefined = undefined;

  constructor(
    private _router: Router
  ) {
  }

  public viewRideDetails(): void {
    const queryParams = {
      id: this.ride?.id
    }
    this._router.navigate(['/rides/ride'], { queryParams });
  }
}
