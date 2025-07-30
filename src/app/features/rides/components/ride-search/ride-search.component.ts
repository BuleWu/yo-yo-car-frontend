import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-ride-search',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIcon,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix
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
      destination: ['', Validators.required],
      date: [new Date(), Validators.required]
    })
  }

  ngOnInit() {
    const startingPoint = this._activatedRoute.snapshot.queryParamMap.get('starting_point');
    const destination = this._activatedRoute.snapshot.queryParamMap.get('destination');
    const date = this._activatedRoute.snapshot.queryParamMap.get('date');

    if(startingPoint && destination && date) {
      this.searchForm.setValue({
        startingPoint: startingPoint,
        destination: destination,
        date: date,
      });
    }
  }

  public searchRides() {
    const { startingPoint, destination, date } = this.searchForm.value;
    const normalizedDate = new Date();
    normalizedDate.setHours(0, 0, 0, 0);
    console.log("Search form: ", this.searchForm.value);
    const queryParams = {
      starting_point: startingPoint,
      destination: destination,
      date: normalizedDate
    }
    this._router.navigate(['/rides/search'], { queryParams });
  }
}
