import {Component} from '@angular/core';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ride-search',
  imports: [
    NavbarComponent,
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
export class RideSearchComponent {
  searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.searchForm = this._fb.group({
      startingPoint: ['', Validators.required],
      destination: ['', Validators.required]
    })
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
