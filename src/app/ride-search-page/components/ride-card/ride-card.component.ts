import {Component, Input} from '@angular/core';
import {User} from '../../../shared/models/user/user-models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ride-card',
  imports: [],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent {
  @Input() rideId: string = '';
  @Input() startingPoint: string = '';
  @Input() destination: string = '';
  @Input() driver?: User;
  @Input() maxPassengers?: number;

  constructor(
    private _router: Router
  ) {
  }

  public viewRideDetails(): void {
    const queryParams = {
      id: this.rideId
    }
    this._router.navigate(['/rides/ride'], { queryParams });
  }
}
