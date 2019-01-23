import { User } from './common/User';

export interface Industry {
  id: number;
  name: string;
  createdAt: Date;
  createdBy: User;

  remarks?: string;
  updatedAt?: Date;
  updatedBy?: User;
}
