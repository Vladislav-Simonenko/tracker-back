import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroDto {
  @ApiProperty({
    description: 'Hero name',
    example: 'string',
  })
  name: string;
  @ApiProperty({
    description: 'Hero world',
    example: 1,
  })
  world_id: number;
  @ApiProperty({
    description: 'Hero owner',
    example: 'string',
    required: false,
  })
  user_id?: string;
  @ApiProperty({
    description: 'Hero cha',
    example: 1,
  })
  cha: number;
  @ApiProperty({
    description: 'Hero con',
    example: 1,
  })
  con: number;
  @ApiProperty({
    description: 'Hero dex',
    example: 1,
  })
  dex: number;
  @ApiProperty({
    description: 'Hero int',
    example: 1,
  })
  int: number;
  @ApiProperty({
    description: 'Hero str',
    example: 1,
  })
  str: number;
  @ApiProperty({
    description: 'Hero wis',
    example: 1,
  })
  wis: number;
  @ApiProperty({
    description: 'Hero notes',
    example: 'string',
    required: false,
  })
  notes?: string;
  @ApiProperty({
    description: 'Hero armorBonus',
    example: 1,
  })
  armorBonus: number;
  @ApiProperty({
    description: 'Hero armor_types_prof',
    example: ['string'],
  })
  armor_types_prof: string | string[];
  @ApiProperty({
    description: 'Hero buff_hp',
    example: 1,
  })
  buff_hp: number;
  @ApiProperty({
    description: 'Hero copper_coins',
    example: 1,
  })
  copper_coins: number;
  @ApiProperty({
    description: 'Hero silver_coins',
    example: 1,
  })
  silver_coins: number;
  @ApiProperty({
    description: 'Hero electrum_coins',
    example: 1,
  })
  electrum_coins: number;
  @ApiProperty({
    description: 'Hero gold_coins',
    example: 1,
  })
  gold_coins: number;
  @ApiProperty({
    description: 'Hero platinum_coins',
    example: 1,
  })
  platinum_coins: number;
  @ApiProperty({
    description: 'Hero current_hp',
    example: 1,
  })
  current_hp: number;
  @ApiProperty({
    description: 'Icon image of the heroes (file upload)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  image_url?: string | null;
  @ApiProperty({
    description: 'Hero max_hp',
    example: 1,
  })
  max_hp: number;
  @ApiProperty({
    description: 'Hero temp_hp',
    example: 1,
  })
  temp_hp: number;
  @ApiProperty({
    description: 'Hero subrace_id',
    example: 1,
    required: false,
  })
  subrace_id?: number;
  @ApiProperty({
    description: 'Hero race_id',
    example: 1,
    required: false,
  })
  race_id?: number;
  @ApiProperty({
    description: 'Hero race_id',
    example: ['string'],
  })
  weapon_types_prof: string | string[];
  @ApiProperty({
    description: 'Hero creation_done',
    example: true,
  })
  creation_done: boolean;
  @ApiProperty({
    description: 'Hero traits',
    example: 'string',
    required: false,
  })
  traits?: string;

  @ApiProperty({
    description: 'Hero ideals',
    example: 'string',
    required: false,
  })
  ideals?: string;

  @ApiProperty({
    description: 'Hero bounds',
    example: 'string',
    required: false,
  })
  bounds?: string;

  @ApiProperty({
    description: 'Hero flaws',
    example: 'string',
    required: false,
  })
  flaws?: string;

  @ApiProperty({
    description: 'Hero languages_ids',
    example: [1],
  })
  languages_ids: string | number[];

  @ApiProperty({
    description: 'Hero tools_ids',
    example: [1],
  })
  tools_ids: string | number[];

  @ApiProperty({
    description: 'Hero armor_id',
    example: 1,
    required: false,
  })
  armor_id?: number;

  @ApiProperty({
    description: 'Hero shield_id',
    example: 1,
    required: false,
  })
  shield_id?: number;

  @ApiProperty({
    description: 'Hero armor_bonus',
    example: 1,
    required: false,
  })
  armor_bonus?: number;

  @ApiProperty({
    description: 'Hero experience',
    example: 1,
    required: false,
  })
  experience?: number;

  @ApiProperty({
    description: 'Hero warlock_pact_id',
    example: 1,
    required: false,
  })
  warlock_pact_id?: number;
}
