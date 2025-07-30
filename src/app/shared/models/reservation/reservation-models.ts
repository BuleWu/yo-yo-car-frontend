import {ReservationStatusesEnum} from '../../../features/reservations/enums/enum';

export interface Reservation {
  id: string;
  userId?: string;
  rideId?: string;
  status?: ReservationStatusesEnum
}
