import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
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
    description: 'Password confirmation',
    example: 'password123',
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'The login of the user',
    example: 'login123',
  })
  login: string;
}
