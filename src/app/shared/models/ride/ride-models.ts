import {User} from '../user/user-models';

export interface Ride {
  id: string;
  startingPoint: string;
  destination: string;
  startTime: string;
  endTime: string;
  price: number;
  driverId: string;
  driver: User;
  passengers: User[];
  finished: boolean;
  maxPassengers: number;
}
