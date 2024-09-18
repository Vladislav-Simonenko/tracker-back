import { ApiProperty } from '@nestjs/swagger';

export class DeleteWeaponDto {
  @ApiProperty({
    description: 'ID of the weapon',
    example: 'string',
  })
  id: string;
}
