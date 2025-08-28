import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {Ride} from '../../../../shared/models/ride/ride-models';
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from '@angular/material/timepicker';
import {RideProviderService} from '../../services/ride-provider-service/ride-provider.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RideStatusesEnum} from "../../enums/enum";

@Component({
  selector: 'app-edit-ride-dialog',
  imports: [
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatButton,
    MatTimepicker,
    MatTimepickerInput,
    MatTimepickerToggle,
  ],
  templateUrl: './edit-ride-dialog.component.html',
  styleUrl: './edit-ride-dialog.component.scss'
})
export class EditRideDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditRideDialogComponent>);
  readonly data = inject<Ride>(MAT_DIALOG_DATA);

  editRideForm!: FormGroup;
  private initialFormValue: any;
  minDate = new Date();

  constructor(
    private _fb: FormBuilder,
    private _rideProviderService: RideProviderService,
    private _snackbar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initialFormValue = this.normalizeFormValue(this.editRideForm.value);
  }

  private initForm(): void{
    this.editRideForm = this._fb.group({
      startingPoint: [this.data.startingPoint, Validators.required],
      destination: [this.data.destination, Validators.required],
      startTime: [new Date(this.data.startTime), Validators.required],
      endTime: [new Date(this.data.endTime), Validators.required],
      maxPassengers: [this.data.maxPassengers, [Validators.required, Validators.min(1), Validators.max(10)]],
      date: [new Date(this.data.date), Validators.required],
      price: [this.data.price, [Validators.required, Validators.min(1), Validators.max(999)]],
    })
  }

  private normalizeFormValue(value: any): any {
    return {
      startingPoint: value.startingPoint?.trim() || '',
      destination: value.destination?.trim() || '',
      startTime: value.startTime instanceof Date ? value.startTime.toISOString() : value.startTime,
      endTime: value.endTime instanceof Date ? value.endTime.toISOString() : value.endTime,
      maxPassengers: Number(value.maxPassengers),
      date: value.date instanceof Date ? value.date.toISOString() : value.date,
      price: Number(value.price),
    };
  }

  get hasFormChanged(): boolean {
    if (!this.initialFormValue) {
      return false;
    }

    const currentValue = this.normalizeFormValue(this.editRideForm.value);

    // Compare each field
    return (
      currentValue.startingPoint !== this.initialFormValue.startingPoint ||
      currentValue.destination !== this.initialFormValue.destination ||
      currentValue.startTime !== this.initialFormValue.startTime ||
      currentValue.endTime !== this.initialFormValue.endTime ||
      currentValue.maxPassengers !== this.initialFormValue.maxPassengers ||
      currentValue.date !== this.initialFormValue.date ||
      currentValue.price !== this.initialFormValue.price
    );
  }

  onSubmit() {
    const {startTime, endTime, date} = this.editRideForm.value;
    const selectedDate = new Date(date);

    const startDateTime = this.combineDateAndTime(selectedDate, new Date(startTime));
    const endDateTime = this.combineDateAndTime(selectedDate, new Date(endTime));

    console.log('Form data: ', this.editRideForm.value);

    this._rideProviderService.updateRide(this.data.id,
      {
        ...this.editRideForm.value,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        date: selectedDate.toISOString(),
      })
      .subscribe({
      next: updatedRide => {
        this._snackbar.open('Ride updated successfully!', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close({
          status: 'success',
          updatedRide: updatedRide,
        });
      },
      error: err => {
        console.error('Error posting ride:', err);
        this._snackbar.open('Failed to update ride. Please try again or refresh the page.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    })
  }

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  private combineDateAndTime(date: Date, time: Date): Date {
    const combined = new Date(date);
    const timeObj = new Date(time);
    combined.setHours(timeObj.getHours(), timeObj.getMinutes(), 0, 0);
    return combined;
  }

  public onFinishRide() {
    this._rideProviderService.finishRide(this.data.id)
      .subscribe({
        next: () => {
          this.dialogRef.close({
            status: 'success',
            updatedRide: {
              ...this.data,
              status: RideStatusesEnum.FINISHED
            }
          });
        }
      })
  }

  public onCancelRide() {
    this._rideProviderService.cancelRide(this.data.id)
      .subscribe({
        next: () => {
          this.dialogRef.close({
            status: 'success',
            updatedRide: {
              ...this.data,
              status: RideStatusesEnum.CANCELLED
            }
          });
        }
      })
  }

  protected readonly RideStatusesEnum = RideStatusesEnum;
}
