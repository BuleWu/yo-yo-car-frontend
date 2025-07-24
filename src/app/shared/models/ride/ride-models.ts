import {User} from '../user/user-models';

export interface Ride {
  id: string;
  startingPoint: string;
  destination: string;
  driverId: string;
  driver: User;
  passengers: User[];
  finished: boolean;
  maxPassengers: number;
}
