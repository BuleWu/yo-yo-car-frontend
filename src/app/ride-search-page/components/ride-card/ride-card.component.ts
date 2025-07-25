import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user/user-models';

@Component({
  selector: 'app-ride-card',
  imports: [],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.scss'
})
export class RideCardComponent {
  @Input() startingPoint: string = '';
  @Input() destination: string = '';
  @Input() driver?: User;
  @Input() maxPassengers?: number;
}
