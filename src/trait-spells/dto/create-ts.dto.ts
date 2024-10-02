import { ApiProperty } from '@nestjs/swagger';

export class CreateTsDto {
  @ApiProperty({
    example: 'string',
    description: 'Trait spell trait id',
  })
  trait_id: string;
  @ApiProperty({
    example: 'string',
    description: 'Trait spell spell id',
  })
  spell_id: string;
}
