import { Component } from '@angular/core';
import {FeatureItemComponent} from './components/feature-item/feature-item.component';

@Component({
  selector: 'app-home-page',
  imports: [
    FeatureItemComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public featureItems = [
    {
      name: 'Search for rides',
      description: 'You can look for rides from an to any location',
      imgPath: '../../assets/images/search-rides.svg',
      backgroundColor: '#EFEAFF',
    },
    {
      name: 'Search for rides',
      description: 'You can look for rides from an to any location',
      imgPath: '../../assets/images/search-rides.svg',
      backgroundColor: '#EFEAFF',
    },
    {
      name: 'Search for rides',
      description: 'You can look for rides from an to any location',
      imgPath: '../../assets/images/search-rides.svg',
      backgroundColor: '#EFEAFF',
    },
    {
      name: 'Search for rides',
      description: 'You can look for rides from an to any location',
      imgPath: '../../assets/images/search-rides.svg',
      backgroundColor: '#EFEAFF',
    },

  ]
}
