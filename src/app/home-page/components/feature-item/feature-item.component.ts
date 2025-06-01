import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-feature-item',
  imports: [],
  templateUrl: './feature-item.component.html',
  styleUrl: './feature-item.component.scss'
})
export class FeatureItemComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() backgroundColor: string = '';
  @Input() imageUrl: string = '';
}
