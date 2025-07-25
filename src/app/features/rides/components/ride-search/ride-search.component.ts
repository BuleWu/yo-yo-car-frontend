import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ride-search',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatIcon
  ],
  templateUrl: './ride-search.component.html',
  styleUrl: './ride-search.component.scss'
})
export class RideSearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.searchForm = this._fb.group({
      startingPoint: ['', Validators.required],
      destination: ['', Validators.required]
    })
  }

  ngOnInit() {
    const startingPoint = this._activatedRoute.snapshot.queryParamMap.get('starting_point');
    const destination = this._activatedRoute.snapshot.queryParamMap.get('destination');

    if(startingPoint && destination) {
      this.searchForm.setValue({
        startingPoint: startingPoint,
        destination: destination
      });
    }
  }

  public searchRides() {
    const { startingPoint, destination } = this.searchForm.value;
    const queryParams = {
      starting_point: startingPoint,
      destination: destination
    }
    this._router.navigate(['/rides/search'], { queryParams });
  }
}
