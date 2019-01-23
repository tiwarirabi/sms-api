import { User } from './common/User';
import { Food } from './food';

export interface Category {
  id: number;
  name: string;
  displayPicture: string;
  foods?: Food[];
  remarks?: string;
  createdBy?: User;
  createdAt?: Date;

  updatedBy?: User;
  updatedAt?: Date;
}
