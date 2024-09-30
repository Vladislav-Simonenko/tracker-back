import { ApiProperty } from '@nestjs/swagger';

export class CreateSpellDto {
  @ApiProperty({
    example: 'string',
    description: 'Spell id',
  })
  id: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell name in Russian',
  })
  name_rus?: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell name in English',
  })
  name_eng?: string;
  @ApiProperty({
    example: 1,
    description: 'Spell level',
  })
  level: number;
  @ApiProperty({
    example: 'string',
    description: 'Spell school',
  })
  school?: string;
  @ApiProperty({
    example: false,
    description: 'Spell component_v',
  })
  component_v: boolean;
  @ApiProperty({
    example: false,
    description: 'Spell component_s',
  })
  component_s: boolean;
  @ApiProperty({
    example: 'string',
    description: 'Spell component_m',
  })
  component_m?: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell source',
  })
  source?: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell range',
  })
  range?: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell duration',
  })
  duration?: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell time',
  })
  time?: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell description',
  })
  description?: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell upper',
  })
  upper?: string;
  @ApiProperty({
    description: 'Spell image',
    type: 'string',
    format: 'binary',
  })
  icon: string;
  @ApiProperty({
    example: false,
    description: 'Spell ritual',
  })
  ritual: boolean;
}
