export enum ReservationStatusesEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export const ReservationIconsMapping = {
  [ReservationStatusesEnum.PENDING]: 'pending_actions',
  [ReservationStatusesEnum.CONFIRMED]: 'cancel_schedule_send',
  [ReservationStatusesEnum.CANCELLED]: 'free_cancellation',
  [ReservationStatusesEnum.COMPLETED]: 'event_available'
}
