import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'The name of the subject in Russian',
    example: 'Доспех',
  })
  name_rus: string;

  @ApiProperty({
    description: 'The name of the subject in English',
    example: 'The armor',
  })
  name_eng: string;

  @ApiProperty({
    description: 'the rules of the game',
    example: true,
  })
  homebrew: boolean;

  @ApiProperty({
    description: 'Item price',
    example: '1.0 зм',
  })
  price: string;

  @ApiProperty({
    description: 'Abbreviation',
    example: 'PHB',
  })
  source: string;

  @ApiProperty({
    description: 'Weight items',
    example: '1',
  })
  weight: string;

  @ApiProperty({
    description: 'Description of the item',
    example: 'This item was forged in dungeons, etc.',
  })
  description: string;

  @ApiProperty({
    description: 'What categories does the subject belong to?',
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
    description: 'Which world does the item belong to',
    example: 1,
    required: false,
  })
  world_id?: number | null;
}
