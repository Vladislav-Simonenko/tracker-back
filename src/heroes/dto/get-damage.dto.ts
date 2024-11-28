import { ApiProperty } from '@nestjs/swagger';

export class GetDamageDto {
  @ApiProperty({
    description: 'The amount of damage to apply to the hero',
    example: 12,
    default: 12,
  })
  damage: number;
}
