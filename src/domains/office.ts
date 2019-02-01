import { User } from './common/User';
import { Industry } from './industry';

export interface Office {
  id: number;
  user?: User;
  name: string;
  location: string;
  noOfEmployees: number;
  maxBudget: number;
  phone: string;
  panNo: string;
  redgNo: string;
  isVerified: boolean;
  createdAt?: Date;
  createdBy?: User;
  industries?: Industry[];

  deliveryTime?: string;
  locationGps?: string;
  verifiedAt?: Date;
  verifiedBy?: User;
  remarks?: string;
  updatedAt?: Date;
  updatedBy?: User;
}
