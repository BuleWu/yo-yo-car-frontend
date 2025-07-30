import {RideProviderService} from '../../services/ride-provider-service/ride-provider.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {Component} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from '@angular/material/timepicker';
import {AuthenticationService} from '../../../auth/services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';


@UntilDestroy()
@Component({
  selector: 'app-post-ride',
  imports: [
    MatStepper,
    MatStep,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatStepLabel,
    MatInput,
    MatLabel,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatTimepickerInput,
    MatTimepicker,
    MatTimepickerToggle
  ],
  templateUrl: './post-ride.component.html',
  styleUrl: './post-ride.component.scss'
})
export class PostRideComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public minDate = new Date();

  constructor(
    private _rideProviderService: RideProviderService,
    private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {
    this.firstFormGroup = this._fb.group({
      startingPoint: ['', Validators.required],
      destination: ['', Validators.required],
      price: ['', Validators.required],
      maxPassengers: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.secondFormGroup = this._fb.group({
      date: [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  public onFinish(event: any) {
    event.stopPropagation();

    const formData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    }

    const {startingPoint, destination, startTime, endTime, price, maxPassengers, date} = formData;

    this._rideProviderService.createRide({
      startingPoint: startingPoint,
      destination: destination,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      price: price,
      driverId: this._authenticationService.getUserId(),
      maxPassengers: maxPassengers,
      date: new Date(date).toISOString(),
    })
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this._snackbar.open('Ride posted successfully!', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this._router.navigateByUrl('/find-ride');
      })
  }
}
