import { ApiProperty } from '@nestjs/swagger';

export class CreateSubraceDto {
  @ApiProperty({
    example: 'string',
    description: 'Subrace name',
  })
  name: string;
  @ApiProperty({
    example: 1,
    description: 'Subrace race id',
  })
  race_id: number;
  @ApiProperty({
    description: 'Subrace image',
    type: 'string',
    format: 'binary',
    required: false,
  })
  icon?: string;
  @ApiProperty({
    example: 'string',
    description: 'Subrace description',
  })
  description?: string;
  @ApiProperty({
    example: 1,
    description: 'Subrace speed',
  })
  speed: number;
  @ApiProperty({
    example: false,
    description: 'Subrace features done',
  })
  features_done: boolean;
}
