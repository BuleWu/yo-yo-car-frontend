import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RideProviderService} from '../features/rides/services/ride-provider-service/ride-provider.service';
import {FooterComponent} from '../shared/components/footer/footer.component';
import {Ride} from '../shared/models/ride/ride-models';
import {DatePipe} from '@angular/common';
import {DurationPipe} from '../shared/pipes/duration-pipe/duration.pipe';
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
import {UserProviderService} from '../features/users/user-provider-service/user-provider.service';
import {debounceTime, filter, from, map, mergeMap, switchMap, take, toArray} from 'rxjs';
import {ROUTES} from '../shared/enums/router.enum';
import {ChatProviderService} from '../features/chats/services/chat-provider-service/chat-provider.service';
import {MatDialog} from '@angular/material/dialog';
import {EditRideDialogComponent} from '../features/rides/dialogs/edit-ride-dialog/edit-ride-dialog.component';
import {RideStatusesEnum} from '../features/rides/enums/enum';

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
  public ride!: Ride;
  public userRating: number = 0;
  public noOfRatings: number = 0;
  public userReservation: Reservation | undefined;
  public rideId!: string;
  public reservationIcon: string = ReservationIconsMapping[ReservationStatusesEnum.INITIAL];
  public hasReservation = false;
  public myUserId!: string;
  public isMyRide = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _rideProviderService: RideProviderService,
    private _ratingProviderService: RatingProviderService,
    private _reservationProviderService: ReservationProviderService,
    private _authenticationService: AuthenticationService,
    private _userProviderService: UserProviderService,
    private _chatProviderService: ChatProviderService,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.myUserId = this._authenticationService.getUserId();
    this.rideId = this._activatedRoute.snapshot.queryParamMap.get('id') as string;

    // get ride data
    this._rideProviderService.getRideById(this.rideId)
      .pipe(
        untilDestroyed(this),
        switchMap((ride) => {
          this.ride = ride;
          this.isMyRide = this.myUserId === this.ride?.driverId;
          return this._ratingProviderService.getRatingsByUserId(this.ride.driverId as string);
        })
      )
      .subscribe({
        next: (ratings) => {
          const sum = ratings.reduce((acc, curr) => acc + curr.value, 0)
          this.noOfRatings = ratings.length;
          this.userRating = ratings.length ? sum / this.noOfRatings : 0;
        },
        error: (err) => {
          console.error(err);
          this._router.navigateByUrl('/rides/find-ride');
        }
      })

    // get ride reservations
    this._rideProviderService.getRideReservations(this.rideId)
      .pipe(untilDestroyed(this))
      .subscribe((reservations) => {
        if(reservations) {
          reservations.map((reservation) => {
            if(reservation.userId === this.myUserId) {
              this.userReservation = reservation;
              if(this.userReservation) {
                this.reservationIcon = ReservationIconsMapping[this.userReservation?.status ?? ReservationStatusesEnum.INITIAL];
              }
            }
          })
        }
      })

    // check if user already has a reservation on another ride
    this._userProviderService.getUserReservations(this.myUserId)
      .pipe(
        map((reservations) => reservations.filter(reservation => reservation.rideId !== this.rideId)),
        switchMap((reservations) => from(reservations)),
        filter(reservation =>
          reservation.status === ReservationStatusesEnum.PENDING ||
          reservation.status === ReservationStatusesEnum.CONFIRMED
        ),
        mergeMap((reservation) => this._rideProviderService.getRideById(reservation.rideId)),
        toArray()
      )
      .subscribe((rides) => {
        if(rides.length) {
          const hasConflict = rides.some((ride) => {
            return ride.startTime < this.ride!.endTime && ride.endTime > this.ride!.startTime;
          });
          if(hasConflict) {
            this.hasReservation = true;
            this.reservationIcon = ReservationIconsMapping[ReservationStatusesEnum.BLOCKED];
          }
        }
      })
  }

  public startChat(): void {
    this._chatProviderService.createChat(this.myUserId, this.ride?.driverId as string, this.rideId)
      .pipe(
        take(1),
        debounceTime(1000)
      )
      .subscribe((chat) => {
        this._router.navigateByUrl(`${ROUTES.CHATS}/${chat.id}`)
      })
  }

  public reservationHandler() {
    if(this.isReservationLocked()) return;

    if(!this.userReservation) {
      this._reservationProviderService.createReservation(
        {
          userId: this.myUserId,
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
    return this.hasReservation  || (status === ReservationStatusesEnum.PENDING ||
      status === ReservationStatusesEnum.CANCELLED ||
      status === ReservationStatusesEnum.COMPLETED);
  }

  public onStartRide(): void {
    this._rideProviderService.startRide(this.rideId)
      .subscribe()

    this.ride.status = RideStatusesEnum.ONGOING;
  }

  public onEditRide(): void {
    const dialogRef = this._dialog.open(EditRideDialogComponent, {
      minHeight: '70vh',
      maxWidth: 'none',
      width: '60vw',
      data: this.ride
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.status === 'success') {
        this.ride = result.updatedRide;
      }
    })
  }

  protected readonly ReservationStatusesEnum = ReservationStatusesEnum;
  protected readonly ReservationIconsMapping = ReservationIconsMapping;
  protected readonly RideStatusesEnum = RideStatusesEnum;
}
