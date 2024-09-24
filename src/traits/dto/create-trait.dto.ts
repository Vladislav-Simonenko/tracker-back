import { ApiProperty } from '@nestjs/swagger';

export class CreateTraitDto {
  @ApiProperty({ example: 'trait-id', description: 'Unique ID of the trait' })
  id: string;

  @ApiProperty({
    example: 'string',
    description: 'Russian name of the trait',
  })
  name_rus: string;

  @ApiProperty({
    example: 'string',
    description: 'English name of the trait',
  })
  name_eng: string;

  @ApiProperty({
    example: 'string',
    description: 'Requirements of the trait',
  })
  requirements: string;

  @ApiProperty({
    example: 'string',
    description: 'Description of the trait',
  })
  description: string;

  @ApiProperty({
    example: 'string',
    description: 'Source of the trait',
  })
  source: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if the trait is homebrew',
  })
  homebrew: boolean;
}
