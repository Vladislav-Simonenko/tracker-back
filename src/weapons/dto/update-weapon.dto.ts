import { ApiProperty } from '@nestjs/swagger';

export class UpdateWeaponDto {
  @ApiProperty({
    description: 'Russian name of the weapon',
    example: 'string',
  })
  name_rus: string;

  @ApiProperty({
    description: 'English name of the weapon',
    example: 'string',
  })
  name_eng: string;

  @ApiProperty({
    description: 'Type of the weapon (as a small integer)',
    example: 1,
  })
  type: number;

  @ApiProperty({
    description: 'Damage dice (optional)',
    example: 'string',
  })
  damage_dice?: string;

  @ApiProperty({
    description: 'Type of damage the weapon deals',
    example: 'string',
  })
  damage_type: string;

  @ApiProperty({
    description: 'Price of the weapon',
    example: 'string',
  })
  price: string;

  @ApiProperty({
    description: 'Source of the weapon',
    example: 'string',
  })
  source: string;

  @ApiProperty({
    description: 'Weight of the weapon',
    example: 2.5,
  })
  weight: number;

  @ApiProperty({
    description: 'Description of the weapon',
    example: 'string',
  })
  description: string;

  @ApiProperty({
    description: 'Special properties of the weapon',
    type: [Object],
  })
  properties: object[];

  @ApiProperty({
    description: 'Special information about the weapon (optional)',
    example: 'string',
  })
  special?: string;

  @ApiProperty({
    description: 'Whether the weapon is homebrew',
    example: true,
  })
  homebrew: boolean;

  @ApiProperty({
    description: 'Icon path for the weapon (optional)',
    example: 'string',
  })
  icon?: string | null;

  @ApiProperty({
    description: 'ID of the world the weapon belongs to (optional)',
    example: 1,
  })
  world_id?: bigint;
}
