import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'reset-token', description: 'Password reset token' })
  token: string;

  @ApiProperty({ example: 'newpassword123', description: 'New password' })
  newPassword: string;
}
