import { ApiProperty } from '@nestjs/swagger';

export class CreateWorldDto {
  @ApiProperty({
    description: 'The master of the world',
    example: 'string',
  })
  user_id: string;
  @ApiProperty({
    description: 'World name',
    example: 'string',
  })
  name: string;
  @ApiProperty({
    description: 'World sources',
    example: ['string'],
  })
  sources: string[];
}
