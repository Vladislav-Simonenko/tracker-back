import { ApiProperty } from '@nestjs/swagger';

export class CreateArmorDto {
  @ApiProperty({
    example: 'string',
    description: 'Armor name in Russian',
  })
  name_rus?: string;
  @ApiProperty({
    example: 'string',
    description: 'Armor name in English',
  })
  name_eng?: string;
  @ApiProperty({
    example: 1,
    description: 'Armor type',
  })
  type: number;
  @ApiProperty({
    example: 1,
    description: 'Armor base ac',
  })
  base_ac: number;
  @ApiProperty({
    example: 'string',
    description: 'Armor ac',
  })
  ac?: string;
  @ApiProperty({
    example: 'string',
    description: 'Armor price',
  })
  price?: string;
  @ApiProperty({
    example: 'string',
    description: 'Armor source',
  })
  source?: string;
  @ApiProperty({
    example: 1,
    description: 'Armor weight',
  })
  weight: number;
  @ApiProperty({
    example: 'example',
    description: 'Armor description',
  })
  description?: string;
  @ApiProperty({
    example: 'string',
    description: 'Armor duration',
  })
  duration?: string;
  @ApiProperty({
    example: false,
    description: 'Is there a disadvantage?',
  })
  disadvantage?: boolean;
  @ApiProperty({
    example: 1,
    description: 'What are the requirements?',
  })
  requirement?: number;
  @ApiProperty({
    example: false,
    description: 'Is there a homebrew?',
  })
  homebrew?: boolean;
  @ApiProperty({
    description: 'Armor image',
    type: 'string',
    format: 'binary',
    required: false,
  })
  icon?: string;
}
