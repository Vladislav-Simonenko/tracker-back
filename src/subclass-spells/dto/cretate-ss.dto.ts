import { ApiProperty } from '@nestjs/swagger';

export class CreateSsDto {
  @ApiProperty({
    example: 'string',
    description: 'subclass-spells spell id ',
  })
  spell_id: string;
  @ApiProperty({
    example: 1,
    description: 'subclass-spells subclass id',
  })
  subclass_id: number;
}
