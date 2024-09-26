import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({
    example: 'string',
    description: 'Class name',
  })
  name?: string;
  @ApiProperty({
    example: 'string',
    description: 'Class main ability',
  })
  main_ability?: string;
  @ApiProperty({
    example: 1,
    description: 'Class hit dice',
  })
  hit_dice?: number;
  @ApiProperty({
    description: 'Class icon',
    type: 'string',
    format: 'binary',
  })
  icon?: string;
  @ApiProperty({
    example: 'string',
    description: 'Class description',
  })
  description?: string;
  @ApiProperty({
    example: 1,
    description: 'subclass level',
  })
  subclass_level: number;
  @ApiProperty({
    example: 'string',
    description: 'Class spell ability',
  })
  spell_ability?: string;
  @ApiProperty({
    example: false,
    description: 'Class metamagic',
  })
  metamagic: boolean;
}
