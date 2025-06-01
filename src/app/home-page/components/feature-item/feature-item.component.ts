import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-feature-item',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './feature-item.component.html',
  styleUrl: './feature-item.component.scss'
})
export class FeatureItemComponent {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() backgroundColor: string = '';
  @Input() imgPath: string = '';
}
