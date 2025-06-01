import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-feature-item',
  imports: [
    MatIcon,
  ],
  templateUrl: './feature-item.component.html',
  styleUrl: './feature-item.component.scss'
})
export class FeatureItemComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() backgroundColor: string = '';
  @Input() icon: string = '';
}
