import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token', example: 'refresh-token' })
  refreshToken: string;
}
