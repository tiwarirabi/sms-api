import { User } from './common/User';
import { Employee } from './employee';

export interface Attendance {
  id: number;
  employee: Employee;
  officeVerified: boolean;
  date: Date;
  remarks?: string;
  createdBy: User;
  createdAt: Date;

  updatedBy?: User;
  updatedAt?: Date;
}
