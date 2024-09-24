import { ApiProperty } from '@nestjs/swagger';

export class CreateToolDto {
  @ApiProperty({
    example: 'string',
    description: 'the tool spoken by the characters',
  })
  name: string;
}
