import { ApiProperty } from '@nestjs/swagger';

export class CreateSubclassDto {
  @ApiProperty({
    example: 'string',
    description: 'Subclass name',
  })
  name: string;
  @ApiProperty({
    example: 1,
    description: 'Subclass class id',
  })
  class_id: number;
  @ApiProperty({
    description: 'Subclass image',
    type: 'string',
    format: 'binary',
    required: false,
  })
  icon?: string;
  @ApiProperty({
    example: 'string',
    description: 'Subclass description',
  })
  description?: string;
  @ApiProperty({
    example: 'string',
    description: 'Subclass source',
  })
  source?: string;
  @ApiProperty({
    example: 'string',
    description: 'Subclass spell ability',
  })
  spell_ability?: string;
}
