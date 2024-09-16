import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user-role.enum';

export class SwitchRoleDto {
  @ApiProperty({
    description: 'The role of the user',
    example: 'USER',
  })
  role: UserRole;
}
