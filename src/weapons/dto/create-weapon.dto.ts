import { ApiProperty } from '@nestjs/swagger';

export class CreateWeaponDto {
  @ApiProperty({
    description: 'Weapon name in Russian',
    example: 'string',
  })
  name_rus: string;

  @ApiProperty({
    description: 'Weapon name in English',
    example: 'string',
  })
  name_eng: string;

  @ApiProperty({
    description: 'Type of weapon',
    example: 1,
  })
  type: number;

  @ApiProperty({
    description: 'Damage dice',
    example: 'string',
  })
  damage_dice?: string;

  @ApiProperty({
    description: 'Damage type',
    example: 'string',
  })
  damage_type: string;

  @ApiProperty({
    description: 'Weapon price',
    example: 'string',
  })
  price: string;

  @ApiProperty({
    description: 'Weapon source',
    example: 'string',
  })
  source: string;

  @ApiProperty({
    description: 'Weapon weight',
    example: 1.1,
  })
  weight: number;

  @ApiProperty({
    description: 'Weapon description',
    example: 'string',
  })
  description: string;

  @ApiProperty({
    description: 'Weapon properties',
    type: 'array',
    items: { type: 'object' },
  })
  properties: Record<string, any>[];

  @ApiProperty({
    description: 'Special attributes',
    example: 'string',
  })
  special?: string;

  @ApiProperty({
    description: 'Is this weapon homebrew?',
    example: true,
  })
  homebrew: boolean;

  @ApiProperty({
    description: 'Weapon icon',
    example: 'string',
  })
  icon?: string | null;

  @ApiProperty({
    description: 'ID of the world this weapon belongs to',
    example: 1,
  })
  world_id?: bigint;
}
