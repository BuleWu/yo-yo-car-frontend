import { Component } from '@angular/core';
import {FeatureItemComponent} from './components/feature-item/feature-item.component';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    FeatureItemComponent,
    MatButton,
    MatDivider,
    NgOptimizedImage
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
      name: 'Save money',
      description: 'Reduce emissions, and meet new people',
      imgPath: '../../assets/images/save-money.svg',
      backgroundColor: '#ECFFDA',
    },
    {
      name: 'Post your own ride',
      description: 'Share your journey with others',
      imgPath: '../../assets/images/ride-share.svg',
      backgroundColor: '#DAE6FF',
    },
    {
      name: 'Trust your fellow travelers',
      description: 'We verify ratings, profiles, and IDs to ensure you know who you’re riding with and who can safely book',
      imgPath: '../../assets/images/check-circle.svg',
      backgroundColor: '#FFE5DA',
    },

  ]
}
