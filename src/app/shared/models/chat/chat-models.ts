import {User} from '../user/user-models';
import {Ride} from '../ride/ride-models';

export interface Chat {
  id: string;
  user1Id: string;
  user2Id: string;
  user1: User;
  user2: User;
  rideId: string;
  ride: Ride;
  lastMessageAt: string;
}

export interface Message {
  id: string;
  content: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  read?: boolean;
  createdAt?: string;
}
