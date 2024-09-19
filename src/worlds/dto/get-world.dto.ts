import { ApiProperty } from '@nestjs/swagger';
import {
  battle_members,
  heroes,
  items,
  magic_items,
  weapons,
} from '@prisma/client';

export class GetWorldDto {
  @ApiProperty({
    description: 'ID of the world',
    example: 1,
  })
  id: bigint;

  @ApiProperty({
    description: 'Date when the world was created',
    example: '2024-09-18T08:39:43.742Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'ID of the user who created the world',
    example: 'some-uuid-value',
  })
  user_id: string;

  @ApiProperty({
    description: 'The name of the world',
    example: 'My Fantasy World',
  })
  name: string;

  @ApiProperty({
    description: 'Sources used in the world',
    example: ['PHB', 'DMG'],
  })
  sources: string[];

  @ApiProperty({
    description: 'List of battle members',
    example: [],
  })
  battle_members: battle_members[];

  @ApiProperty({
    description: 'List of heroes in the world',
    example: [],
  })
  heroes: heroes[];

  @ApiProperty({
    description: 'List of items in the world',
    example: [],
  })
  items: items[];

  @ApiProperty({
    description: 'List of magic items in the world',
    example: [],
  })
  magic_items: magic_items[];

  @ApiProperty({
    description: 'List of weapons in the world',
    example: [],
  })
  weapons: weapons[];
}
