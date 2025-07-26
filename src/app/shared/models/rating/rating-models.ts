import {User} from '../user/user-models';
import {Ride} from '../ride/ride-models';

export interface Rating {
  id: string;
  createdAt: string;
  updatedAt: string;

  value: number;

  raterId: string;
  rater?: User;

  ratedUserId: string;
  ratedUser?: User;

  rideId: string;
  ride?: Ride;

  comment: string;
}
