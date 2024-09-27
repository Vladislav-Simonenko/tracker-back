import { ApiProperty } from '@nestjs/swagger';

export class CreateApsDto {
  @ApiProperty({
    example: 'string',
    description: 'Spell',
  })
  spell_id: string;
  @ApiProperty({
    example: 1,
    description: 'Subclass',
    required: false,
  })
  subclass_id?: number;
  @ApiProperty({
    example: 1,
    description: 'Class',
    required: false,
  })
  class_id?: number;
}
