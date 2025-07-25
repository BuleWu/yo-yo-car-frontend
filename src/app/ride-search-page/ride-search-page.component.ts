import { Component } from '@angular/core';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {RideSearchComponent} from '../features/rides/components/ride-search/ride-search.component';

@Component({
  selector: 'app-ride-search-page',
  imports: [
    NavbarComponent,
    RideSearchComponent
  ],
  templateUrl: './ride-search-page.component.html',
  styleUrl: './ride-search-page.component.scss'
})
export class RideSearchPageComponent {

}
