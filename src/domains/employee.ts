import { User } from './common/User';
import { Office } from './office';

export interface Employee {
    id: number;
    user: User;
    office: Office;
    department: string;
    isAdminBlocked: boolean;
    isOfficeBlocked: boolean;
    designation: string;
    birthDate: Date;
    gender: string;
    identificationDocumentPicture?: string;
    isVeg: boolean;
    joiningDate: Date;
    employmentType: string;
    createdAt: Date;
    createdBy: User;
    
    remarks?: string;
    updatedAt?: Date;
    updatedBy?: User;
}