import { ApiProperty } from '@nestjs/swagger';

export class CreateBmDto {
  @ApiProperty({
    example: 1,
    description: 'world id',
  })
  world_id: number;
  @ApiProperty({
    example: 1,
    description: 'initiative',
    required: false,
  })
  initiative?: number;
  @ApiProperty({
    example: 1,
    description: 'max hp',
    required: false,
  })
  max_hp?: number;
  @ApiProperty({
    example: 1,
    description: 'current hp',
    required: false,
  })
  current_hp?: number;
  @ApiProperty({
    example: 1,
    description: 'hero id',
    required: false,
  })
  hero_id?: number;
  @ApiProperty({
    example: 1,
    description: 'monster id',
    required: false,
  })
  monster_id?: number;
  @ApiProperty({
    example: false,
    description: 'hidden or no?',
  })
  hidden: boolean;
  @ApiProperty({
    example: 'string',
    description: 'battle name',
    required: false,
  })
  name?: string;
}
