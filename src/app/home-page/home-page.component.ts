import { Component } from '@angular/core';
import {FeatureItemComponent} from './components/feature-item/feature-item.component';
import {MatButton} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {NgOptimizedImage} from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FooterComponent} from "../shared/components/footer/footer.component";
import {NavbarComponent} from "../shared/components/navbar/navbar.component";


@Component({
  selector: 'app-home-page',
  imports: [
    FeatureItemComponent,
    MatButton,
    MatDividerModule,
    NgOptimizedImage,
    MatIcon,
    MatInputModule,
    MatFormFieldModule,
    FooterComponent,
    NavbarComponent
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
