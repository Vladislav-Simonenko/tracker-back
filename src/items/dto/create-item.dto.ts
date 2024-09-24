import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'Hero name in Russian',
    example: 'string',
  })
  name_rus: string;
  @ApiProperty({
    description: 'Hero name in English',
    example: 'string',
  })
  name_eng: string;
  @ApiProperty({
    description: 'Item homebrew',
    example: false,
  })
  homebrew: boolean;
  @ApiProperty({
    description: 'Item price',
    example: 'string',
  })
  price: string;
  @ApiProperty({
    description: 'Item source',
    example: 'string',
  })
  source: string;
  @ApiProperty({
    description: 'Item weight',
    example: 'string',
  })
  weight?: string;
  @ApiProperty({
    description: 'Item description',
    example: 'string',
  })
  description: string;
  @ApiProperty({
    description: 'Item categories',
    example: ['string'],
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
    description: 'Item world',
    example: 1,
  })
  world_id?: bigint;
}
