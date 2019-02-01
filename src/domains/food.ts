import { User } from './common/User';
import { Category } from './category';

export interface Food {
  id: number;
  categoryId?: number;
  category: Category;
  name: string;
  type: string;
  price: string;
  isVeg: boolean;
  remarks?: string;
  createdBy: User;
  createdAt: Date;

  updatedBy?: User;
  updatedAt?: Date;
}
