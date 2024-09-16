import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user-role.dto';

export class SwitchRoleDto {
  @ApiProperty({
    description: 'The role of the user',
    example: 'USER',
  })
  role: UserRole;
}
