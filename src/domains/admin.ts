import { User } from './common/User';

export interface Admin{
    id: number;
    role: string;
    user: User;
    createdBy: User;
    createdAt: Date;
    
    updatedBy?: User;
    updatedAt?: Date;
}