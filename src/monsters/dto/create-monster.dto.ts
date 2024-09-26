import { ApiProperty } from '@nestjs/swagger';

export class CreateMonsterDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the monster.',
  })
  id: bigint;

  @ApiProperty({
    example: 'Goblin',
    description: 'Russian name of the monster.',
  })
  name_rus: string;

  @ApiProperty({
    example: 'Goblin',
    description: 'English name of the monster.',
  })
  name_eng: string;

  @ApiProperty({
    example: { size: 'Medium', height: 170 },
    description: 'Size details of the monster in JSON format.',
  })
  size: any;

  @ApiProperty({
    example: 'Humanoid',
    description: 'Type of the monster.',
  })
  type: string;

  @ApiProperty({
    example: '1/4',
    description: 'Challenge rating of the monster, represents its difficulty.',
  })
  challenge_rating: string;

  @ApiProperty({
    example: '/monsters/goblin',
    description: 'Unique URL slug for the monster entry.',
  })
  url: string;

  @ApiProperty({
    example: 'Monster Manual',
    description: 'Source of the monster information.',
  })
  source: string;

  @ApiProperty({
    example: 100,
    description: 'Experience points awarded for defeating the monster.',
  })
  experience: bigint;

  @ApiProperty({
    example: 15,
    description: 'Armor class of the monster.',
  })
  armor_class: bigint;

  @ApiProperty({
    example: [{ type: 'Light Armor', protection: 2 }],
    description: 'List of armors the monster is wearing.',
  })
  armors: any[];

  @ApiProperty({
    example: { total: 30, current: 25 },
    description: 'Hit points and remaining health of the monster.',
  })
  hits: any;

  @ApiProperty({
    example: [{ type: 'Walk', speed: 30 }],
    description: 'Speed types and values for the monster in JSON format.',
  })
  speed: any[];

  @ApiProperty({
    example: { strength: 10, dexterity: 12 },
    description: 'Ability scores of the monster, stored in JSON.',
  })
  ability: any;

  @ApiProperty({
    example: [{ skill: 'Stealth', modifier: 3 }],
    description: 'Skills the monster is proficient in.',
  })
  skills: any[];

  @ApiProperty({
    example: [{ sense: 'Darkvision', range: 60 }],
    description: 'Senses of the monster.',
  })
  senses: any[];

  @ApiProperty({
    example: ['Common', 'Goblin'],
    description: 'Languages the monster can speak.',
  })
  languages: string[];

  @ApiProperty({
    example: [{ feat: 'Sneak Attack', description: 'Extra damage on attack' }],
    description: 'Feats the monster has access to.',
  })
  feats: any[];

  @ApiProperty({
    example: [{ action: 'Slash', damage: 6 }],
    description: 'Actions the monster can take during combat.',
  })
  actions: any[];

  @ApiProperty({
    example: [{ bonus_action: 'Dash', description: 'Extra movement' }],
    description: 'Bonus actions the monster can perform.',
  })
  bonus_actions: any[];

  @ApiProperty({
    example: ['Undead', 'Goblin'],
    description: 'Tags categorizing the monster.',
  })
  tags: any[];

  @ApiProperty({
    example: ['/images/goblin.png'],
    description: 'Array of image paths for the monster.',
  })
  images: string[];

  @ApiProperty({
    example: 'Chaotic Evil',
    description: 'Alignment of the monster.',
  })
  alignment: string;

  @ApiProperty({
    example: [{ save: 'Dexterity', modifier: 3 }],
    description: 'Saving throw proficiencies of the monster.',
  })
  saving_throws: any[];

  @ApiProperty({
    example: ['Poison', 'Cold'],
    description: 'Condition immunities of the monster.',
  })
  condition_immunities: string[];

  @ApiProperty({
    example: ['Fire', 'Psychic'],
    description: 'Damage immunities the monster possesses.',
  })
  damage_immunities: string[];

  @ApiProperty({
    example: '2',
    description: 'Proficiency bonus of the monster.',
  })
  proficiency_bonus: string;

  @ApiProperty({
    example: [{ reaction: 'Parry', description: 'Reduce damage taken' }],
    description: 'Reactions available to the monster.',
  })
  reactions: any[];

  @ApiProperty({
    example: 'Counterattack',
    description: 'Description of the reaction ability.',
  })
  reaction: string;

  @ApiProperty({
    example: [{ resistance: 'Fire', description: 'Takes half damage' }],
    description: 'Damage resistances of the monster.',
  })
  damage_resistances: any[];

  @ApiProperty({
    example: { legendary_action: 'Strike twice' },
    description: 'Legendary abilities of the monster.',
  })
  legendary: any;

  @ApiProperty({
    example: { lair_ability: 'Cause fear in enemies' },
    description: 'Abilities the monster can use in its lair.',
  })
  lair: any;
}
