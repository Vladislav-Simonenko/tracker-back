import { ApiProperty } from '@nestjs/swagger';

export class CreateWpDto {
  @ApiProperty({
    example: 'string',
    description: 'warlock pacts name',
  })
  name: string;
  @ApiProperty({
    example: 'string',
    description: 'warlock pacts description',
  })
  description: string;
}
