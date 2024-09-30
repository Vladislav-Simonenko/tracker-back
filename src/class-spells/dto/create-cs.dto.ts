import { ApiProperty } from '@nestjs/swagger';

export class CreateClassSpellDto {
  @ApiProperty({
    example: 1,
    description: 'Class id',
  })
  class_id: number;
  @ApiProperty({
    example: 'string',
    description: 'Class id',
  })
  spell_id: string;
}
