import { ApiProperty } from '@nestjs/swagger';

export class CreateWorldDto {
  @ApiProperty({
    example: 'string',
    description: 'Who created the world',
  })
  user_id: string;
  @ApiProperty({
    example: 'string',
    description: 'World name',
  })
  name: string;
  @ApiProperty({
    example: ['string'],
    description: 'World sources',
  })
  sources: string[];
}
