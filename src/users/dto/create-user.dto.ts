import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;
  @ApiProperty({
    description: 'The login of the user',
    example: 'login123',
  })
  login: string;
  @ApiProperty({
    description: 'The role of the user',
    example: 'MASTER',
  })
  role: UserRole;

  isVerified?: true;

  @ApiProperty({
    description: 'The fullname of the user',
    example: 'John Doe',
  })
  fullname: string;
}
