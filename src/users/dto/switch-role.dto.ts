import { ApiProperty } from '@nestjs/swagger';

export class SwitchRoleDto {
  @ApiProperty({
    description: 'The role of the user',
    example: 'USER',
  })
  role: 'USER' | 'ADMIN' | 'MASTER';
}
