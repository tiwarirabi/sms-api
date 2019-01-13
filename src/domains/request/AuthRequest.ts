import { Request } from 'express';
import { User } from '../common/User';

export interface AuthRequest extends Request{
    user?: User;
}