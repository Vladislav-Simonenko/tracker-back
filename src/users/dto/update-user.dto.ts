import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password?: string;
  @ApiProperty({
    description: 'The login of the user',
    example: 'login123',
  })
  login?: string;
  @ApiProperty({
    description: 'The role of the user',
    example: 'MASTER',
  })
  role?: 'USER' | 'ADMIN' | 'MASTER';
  @ApiProperty({
    description: 'The isVerified of the user',
    example: 'true',
  })
  isVerified?: boolean;
}
