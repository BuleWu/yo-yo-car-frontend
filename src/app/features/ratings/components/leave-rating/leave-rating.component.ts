import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RatingProviderService} from '../../services/rating-provider.service';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {ROUTES} from '../../../../shared/enums/router.enum';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-rating',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatButton
  ],
  templateUrl: './leave-rating.component.html',
  styleUrl: './leave-rating.component.scss'
})
export class LeaveRatingComponent implements OnInit {
  rideId!: string;
  driverId!: string;
  passengerId!: string;
  token!: string;
  ratingForm: FormGroup;

  stars = [1, 2, 3, 4, 5];

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
    private _ratingProviderService: RatingProviderService,
    private _authenticationService: AuthenticationService,
    private _snackbar: MatSnackBar,
  ) {
    this.ratingForm = this._fb.group({
      value: [0, Validators.min(1)],
      comment: ['']
    });
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.rideId = params['rideId'];
      this.driverId = params['driverId'];
      this.passengerId = params['passengerId'];
      this.token = params['token'];
    });
  }

  public setRating(rating: number) {
    this.ratingForm.patchValue({ value: rating });
  }

  public onSubmit(): void {
    this._ratingProviderService.createRating(this.ratingForm.value, this._authenticationService.getUserId(), this.driverId, this.rideId)
      .subscribe({
        next: () => {
          this._snackbar.open('Rating posted successfully!', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this._router.navigateByUrl(`/${ROUTES.FIND_RIDE}`);
        },
        error: err => {
          this._snackbar.open(`There was an error posting the rating: ${err.error.message}` , 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      })
  }
}
