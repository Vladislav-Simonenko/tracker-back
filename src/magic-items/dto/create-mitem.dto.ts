import { ApiProperty } from '@nestjs/swagger';

export class CreateMitemDto {
  @ApiProperty({
    description: 'Magic item id',
    example: 'string',
  })
  id: string;
  @ApiProperty({
    description: 'Magic item name in Russian',
    example: 'string',
  })
  name_rus: string;
  @ApiProperty({
    description: 'Magic item name in English',
    example: 'string',
  })
  name_eng: string;
  @ApiProperty({
    description: 'Magic item homebrew',
    example: false,
  })
  homebrew: boolean;
  @ApiProperty({
    description: 'Magic item damage',
    example: 'string',
  })
  cost_dmg?: string;
  @ApiProperty({
    description: 'Magic item source',
    example: 'string',
  })
  source: string;
  @ApiProperty({
    description: 'Magic item description',
    example: 'string',
  })
  description: string;
  @ApiProperty({
    description: 'Magic item detailType',
    example: ['string'],
  })
  detailType: string | string[];
  @ApiProperty({
    description: 'Magic item type',
    example: 'string',
  })
  type: string;
  @ApiProperty({
    description: 'Magic item rarity',
    example: 'string',
  })
  rarity: string;
  @ApiProperty({
    description: 'Magic item cost',
    example: 'string',
  })
  cost_xge?: string;
  @ApiProperty({
    description: 'Magic item customization',
    example: false,
  })
  customization: string | boolean;
  @ApiProperty({
    description: 'Magic item detail Customization',
    example: ['string'],
  })
  detailCustomization: string | string[];
  @ApiProperty({
    description: 'Magic item allowed_weapon_ids',
    example: ['string'],
  })
  allowed_weapon_ids: string | string[];
  @ApiProperty({
    description: 'Magic item allowed_weapon_types',
    example: [1],
  })
  allowed_weapon_types: string | number[];
  @ApiProperty({
    description: 'Icon image of the magic item (file upload)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  icon?: string;
  @ApiProperty({
    description: 'Magic item ext_icon',
    example: 'string',
  })
  ext_icon?: string;
  @ApiProperty({
    description: 'Magic item world',
    example: 1,
  })
  world_id?: number;
  @ApiProperty({
    description: 'Magic item spell_id',
    example: 'string',
  })
  spell_id?: string;
}
