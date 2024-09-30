import { ApiProperty } from '@nestjs/swagger';

export class CreateFsDto {
  @ApiProperty({
    example: 'string',
    description: 'Fighting style name',
  })
  name: string;
  @ApiProperty({
    example: 'string',
    description: 'Fighting style description',
  })
  description: string;
}
