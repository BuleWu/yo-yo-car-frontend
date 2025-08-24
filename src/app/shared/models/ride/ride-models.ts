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
  date: string;
  passengers: User[];
  status: string;
  maxPassengers: number;
}
