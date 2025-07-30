import {RideProviderService} from '../../services/ride-provider-service/ride-provider.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatFormField, MatInput, MatInputModule, MatSuffix} from '@angular/material/input';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';


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
    MatSuffix
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
    private _fb: FormBuilder
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

  public onSubmit() {
   /* this._rideProviderService.createRide()
      .pipe(untilDestroyed(this))
      .subscribe()*/
  }
}
