import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty({
    example: 'string',
    description: 'Unique ID of the feature',
  })
  id: string;

  @ApiProperty({ example: 1, description: 'Class ID', required: false })
  class_id?: number;

  @ApiProperty({ example: 1, description: 'Subclass ID', required: false })
  subclass_id?: bigint;

  @ApiProperty({
    example: 'string',
    description: 'Description of the feature',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'Level of the feature',
    required: false,
  })
  level?: number;

  @ApiProperty({ example: 'string', description: 'Name of the feature' })
  name: string;

  @ApiProperty({
    example: 'string',
    description: 'Upgrade information for the feature',
    required: false,
  })
  upgrade?: string;

  @ApiProperty({
    example: 'string',
    description: 'Source of the feature',
  })
  source: string;

  @ApiProperty({ example: 1, description: 'Race ID', required: false })
  race_id?: number;

  @ApiProperty({ example: 1, description: 'Subrace ID', required: false })
  subrace_id?: number;

  @ApiProperty({
    example: 'string',
    description: 'Spell ID',
    required: false,
  })
  spell_id?: string;
}
