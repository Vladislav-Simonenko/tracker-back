import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '@users/dto/get-user.dto';
import { GetArmorDto } from 'src/armor/dto/get-armor.dto';
import { GetShieldDto } from 'src/armor/dto/get-shield.dto';
import { GetRaceDto } from 'src/races/dto/get-race.dto';
import { GetSubraceDto } from 'src/subraces/dto/get-subrace.dto';
import { GetWPDto } from 'src/warlock_pacts/dto/get-wp.dto';
import { GetWorldDto } from 'src/worlds/dto/get-world.dto';

export class GetHeroByIdDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  world_id: bigint;

  @ApiProperty()
  user_id?: string;

  @ApiProperty()
  cha: number;

  @ApiProperty()
  con: number;

  @ApiProperty()
  dex: number;

  @ApiProperty()
  int: number;

  @ApiProperty()
  str: number;

  @ApiProperty()
  wis: number;

  @ApiProperty()
  notes?: string;

  @ApiProperty()
  armorBonus: number;

  @ApiProperty({ type: [String] })
  armor_types_prof: string[];

  @ApiProperty()
  buff_hp: number;

  @ApiProperty()
  copper_coins: number;

  @ApiProperty()
  silver_coins: number;

  @ApiProperty()
  electrum_coins: number;

  @ApiProperty()
  gold_coins: number;

  @ApiProperty()
  platinum_coins: number;

  @ApiProperty()
  current_hp: number;

  @ApiProperty()
  image_url?: string;

  @ApiProperty()
  max_hp: number;

  @ApiProperty()
  temp_hp: number;

  @ApiProperty()
  subrace_id?: number;

  @ApiProperty()
  race_id?: number;

  @ApiProperty({ type: [String] })
  weapon_types_prof: string[];

  @ApiProperty()
  creation_done: boolean;

  @ApiProperty()
  traits?: string;

  @ApiProperty()
  ideals?: string;

  @ApiProperty()
  bounds?: string;

  @ApiProperty()
  flaws?: string;

  @ApiProperty()
  languages_ids?: number[];

  @ApiProperty()
  tools_ids?: number[];

  @ApiProperty()
  armor_id?: bigint;

  @ApiProperty()
  shield_id?: bigint;

  @ApiProperty()
  armor_bonus?: bigint;

  @ApiProperty()
  experience?: bigint;

  @ApiProperty()
  warlock_pact_id?: bigint;

  @ApiProperty()
  armors_heroes_armor_idToarmors: GetArmorDto;

  @ApiProperty()
  races: GetRaceDto;

  @ApiProperty()
  armors_heroes_shield_idToarmors: GetShieldDto;

  @ApiProperty()
  subraces: GetSubraceDto;

  @ApiProperty()
  warlock_pacts: GetWPDto;

  @ApiProperty()
  worlds: GetWorldDto;

  @ApiProperty()
  languages: [];

  @ApiProperty()
  tools: [];

  @ApiProperty()
  user: GetUserDto;
}
