import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'The name of the item in Russian',
    example: 'Доспех',
  })
  name_rus: string;

  @ApiProperty({
    description: 'The name of the item in English',
    example: 'The armor',
  })
  name_eng: string;

  @ApiProperty({
    description: 'Whether the item is homebrew',
    example: true,
  })
  homebrew: boolean;

  @ApiProperty({
    description: 'Item price',
    example: '1.0 зм',
  })
  price: string;

  @ApiProperty({
    description: 'Source abbreviation',
    example: 'PHB',
  })
  source: string;

  @ApiProperty({
    description: 'Weight of the item',
    example: '1',
  })
  weight?: string | null;

  @ApiProperty({
    description: 'Description of the item',
    example: 'This item was forged in dungeons, etc.',
  })
  description: string;

  @ApiProperty({
    description: 'Categories the item belongs to',
    example: ['Боеприпасы'],
  })
  categories: string[];

  @ApiProperty({
    description: 'Icon image of the item (file upload)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  icon?: string | null;

  @ApiProperty({
    description: 'World ID the item belongs to',
    example: 1,
    required: false,
  })
  world_id?: number | null;
}
