import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RideProviderService} from '../features/rides/services/ride-provider-service/ride-provider.service';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {Ride} from '../shared/models/ride/ride-models';
import {DatePipe} from '@angular/common';
import {DurationPipe} from '../shared/pipes/duration.pipe';
import {RatingProviderService} from '../features/ratings/services/rating-provider.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NavbarComponent} from '../shared/components/navbar/navbar.component';
import {
  ReservationProviderService
} from '../features/reservations/services/reservation-provider-service/reservation-provider.service';
import {AuthenticationService} from '../features/auth/services/authentication.service';
import {Reservation} from '../shared/models/reservation/reservation-models';
import {ReservationIconsMapping, ReservationStatusesEnum} from '../features/reservations/enums/enum';

@UntilDestroy()
@Component({
  selector: 'app-ride-info',
  imports: [
    FooterComponent,
    DatePipe,
    DurationPipe,
    MatIcon,
    RouterLink,
    MatButton,
    MatDivider,
    NavbarComponent,
  ],
  templateUrl: './ride-info.component.html',
  styleUrl: './ride-info.component.scss'
})
export class RideInfoComponent implements OnInit {
  public ride: Ride | undefined;
  public userRating: number = 0;
  public noOfRatings: number = 0;
  public userReservation: Reservation | undefined;
  public rideId!: string;
  public reservationIcon: string = ReservationIconsMapping[ReservationStatusesEnum.INITIAL];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _rideProviderService: RideProviderService,
    private _ratingProviderService: RatingProviderService,
    private _reservationProviderService: ReservationProviderService,
    private _authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    console.log('Reservation icon: ', this.reservationIcon)
    this.rideId = this._activatedRoute.snapshot.queryParamMap.get('id') as string;

    this._rideProviderService.getRideById(this.rideId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (ride) => {
          this.ride = ride;
          this._ratingProviderService.getRatingsByUserId(this.ride.driverId as string)
            .pipe(untilDestroyed(this))
            .subscribe((ratings) => {
              const sum = ratings.reduce((acc, curr) => acc + curr.value, 0)
              this.noOfRatings = ratings.length;
              this.userRating = ratings.length ? sum / this.noOfRatings : 0;
            })
        },
        error: (err) => {
          console.error(err);
          this._router.navigateByUrl('/rides/find-ride');
        }
      })

    this._rideProviderService.getRideReservations(this.rideId)
      .pipe(untilDestroyed(this))
      .subscribe((reservations) => {
        if(reservations) {
          reservations.map((reservation) => {
            if(reservation.userId === this._authenticationService.getUserId()) {
              this.userReservation = reservation;
              if(this.userReservation) {
                this.reservationIcon = ReservationIconsMapping[this.userReservation?.status ?? ReservationStatusesEnum.INITIAL];
              }
            }
          })
        }
      })
  }

  public startChat(): void {

  }

  public reservationHandler() {
    console.log(this.userReservation?.status);
    if(this.isReservationLocked()) return;

    if(!this.userReservation) {
      this._reservationProviderService.createReservation(
        {
          userId: this._authenticationService.getUserId(),
          rideId: this.rideId
        }
      )
        .subscribe((updatedReservation) => {
          this.userReservation = updatedReservation;
          this.reservationIcon = ReservationIconsMapping[this.userReservation?.status ?? ReservationStatusesEnum.INITIAL];
        });
    } else if(this.userReservation.status === ReservationStatusesEnum.CONFIRMED) {
      this._reservationProviderService.updateReservation(this.userReservation.id, {
        status: ReservationStatusesEnum.CANCELLED
      })
        .subscribe((updatedReservation) => {
          this.userReservation = updatedReservation;
          this.reservationIcon = ReservationIconsMapping[this.userReservation?.status ?? ReservationStatusesEnum.INITIAL];
        });
    }
  }

  public isReservationLocked(): boolean {
    const status = this.userReservation?.status;
    return status === ReservationStatusesEnum.PENDING ||
      status === ReservationStatusesEnum.CANCELLED ||
      status === ReservationStatusesEnum.COMPLETED;
  }

  protected readonly ReservationStatusesEnum = ReservationStatusesEnum;
  protected readonly ReservationIconsMapping = ReservationIconsMapping;
}
