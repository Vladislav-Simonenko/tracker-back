import { ApiProperty } from '@nestjs/swagger';

export class CreateInvocationDto {
  @ApiProperty({
    example: 'string',
    description: 'Invocation id',
  })
  id: string;
  @ApiProperty({
    example: 'string',
    description: 'Invocation name in Russian',
  })
  name_rus: string;
  @ApiProperty({
    example: 'string',
    description: 'Invocation name in English',
  })
  name_eng: string;
  @ApiProperty({
    example: 'string',
    description: 'Invocation requirements',
  })
  requirements?: string;
  @ApiProperty({
    example: 'string',
    description: 'Invocation description',
  })
  description: string;
  @ApiProperty({
    example: 'string',
    description: 'Invocation source',
  })
  source: string;
  @ApiProperty({
    example: 'string',
    description: 'Spell_id',
  })
  spell_id?: string;
}
