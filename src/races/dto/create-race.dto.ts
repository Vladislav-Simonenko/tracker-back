import { ApiProperty } from '@nestjs/swagger';

export class CreateRaceDto {
  @ApiProperty({
    description: 'Race name',
    example: 'string',
  })
  name?: string;
  @ApiProperty({
    description: 'Race name',
    type: 'string',
    format: 'binary',
  })
  icon?: string | null;
  @ApiProperty({
    description: 'Race description',
    example: 'string',
  })
  description?: string;
  @ApiProperty({
    description: 'Race speed',
    example: 30,
  })
  speed?: number;
}
