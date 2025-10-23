import { UserRole } from './user.dto';
import { UserId } from './user.entity';

export type UserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

export type CreateUserModel = Omit<UserModel, 'id'> & { password: string };
