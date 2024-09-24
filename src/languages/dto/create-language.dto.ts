import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty({
    example: 'string',
    description: 'the language spoken by the charactersы',
  })
  name: string;
}
