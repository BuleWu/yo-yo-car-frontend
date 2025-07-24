import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ride-search',
  imports: [
    NavbarComponent
  ],
  templateUrl: './ride-search.component.html',
  styleUrl: './ride-search.component.scss'
})
export class RideSearchComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const startingPoint = this._activatedRoute.snapshot.queryParamMap.get("starting_point")
    const destination = this._activatedRoute.snapshot.queryParamMap.get("destination")
  }

}
