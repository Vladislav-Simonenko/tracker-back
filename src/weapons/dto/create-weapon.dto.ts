import { ApiProperty } from '@nestjs/swagger';

export class CreateWeaponDto {
  @ApiProperty({
    example: 'string',
    description: 'Weapon name in Russian',
  })
  name_rus: string;
  @ApiProperty({
    example: 'string',
    description: 'Weapon name in English',
  })
  name_eng: string;
  @ApiProperty({
    example: 1,
    description: 'Weapon type',
  })
  type: number;
  @ApiProperty({
    example: 'string',
    description: 'Damage dice',
  })
  damage_dice?: string;
  @ApiProperty({
    example: 'string',
    description: 'Weapon damage type',
  })
  damage_type: string;
  @ApiProperty({
    example: 'string',
    description: 'Weaponn price',
  })
  price: string;
  @ApiProperty({
    example: 'string',
    description: 'Weapon source',
  })
  source: string;
  @ApiProperty({
    example: 10.5,
    description: 'Wapon weight',
  })
  weight: number;
  @ApiProperty({
    example: 'string',
    description: 'Weapon description',
  })
  description: string;
  @ApiProperty({
    example: 'string',
    description: 'Weapon properties',
  })
  properties: string[];
  @ApiProperty({
    example: 'string',
    description: 'Weapon special',
  })
  special?: string;
  @ApiProperty({
    example: false,
    description: 'This is homebrew?',
  })
  homebrew: boolean;
  @ApiProperty({
    description: 'Weapon image',
    type: 'string',
    format: 'binary',
    required: false,
  })
  icon?: string | null;
  @ApiProperty({
    example: 1,
    description: 'ID of the world where weapons are used',
  })
  world_id?: number;
}
