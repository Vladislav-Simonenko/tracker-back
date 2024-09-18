import { UserRole } from './user-role.enum';

export class GetUserDto {
  id: string;
  email: string;
  fullname: string;
  login: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
