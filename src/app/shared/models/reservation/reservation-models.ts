import {ReservationStatusesEnum} from '../../../features/reservations/enums/enum';

export interface Reservation {
  userId?: string;
  rideId?: string;
  status?: ReservationStatusesEnum
}
