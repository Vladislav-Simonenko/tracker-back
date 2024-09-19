import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorldDto {
  @ApiProperty({
    description: 'The master of the world',
    example: 'string',
  })
  user_id: string;
  @ApiProperty({
    description: 'World name',
    example: 'string',
    required: false,
  })
  name?: string;
  @ApiProperty({
    description: 'World sources',
    example: ['string'],
    required: false,
  })
  sources?: string[];
}
