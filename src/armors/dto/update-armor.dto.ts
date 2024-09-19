import { ApiProperty } from '@nestjs/swagger';

export class UpdateArmorDto {
  @ApiProperty({
    description: 'The name of the armor in Russian',
    example: 'string',
  })
  name_rus?: string;
  @ApiProperty({
    description: 'The name of the armor in English',
    example: 'string',
  })
  name_eng?: string;
  @ApiProperty({
    description: 'Type armor',
    example: 1,
  })
  type: number;
  @ApiProperty({
    description: 'Base armor class (AC)',
    example: 1,
  })
  base_ac?: bigint;
  @ApiProperty({
    description: 'Armor class (AC)',
    example: 'string',
  })
  ac?: string;
  @ApiProperty({
    description: 'Armor price',
    example: 'string',
  })
  price?: string;
  @ApiProperty({
    description: 'Source abbreviation',
    example: 'string',
  })
  source?: string;
  @ApiProperty({
    description: 'Armor weight',
    example: 1,
  })
  weight?: number;
  @ApiProperty({
    description: 'Description of the armor',
    example: 'string',
  })
  description?: string;
  @ApiProperty({
    description: 'Duration of action',
    example: 'string',
  })
  duration?: string;
  @ApiProperty({
    description: 'lack of armor',
    example: true,
  })
  disadvantage?: boolean;
  @ApiProperty({
    description: 'Armor requirement',
    example: 1,
  })
  requirement?: bigint;
  @ApiProperty({
    description: 'Whether the armor is homebrew',
    example: true,
  })
  homebrew?: boolean;

  @ApiProperty({
    description: 'Icon image of the armor (file upload)',
    type: 'string',
    format: 'binary',
  })
  icon?: string | null;
}
