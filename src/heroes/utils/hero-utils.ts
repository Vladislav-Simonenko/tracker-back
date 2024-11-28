import { CreateHeroDto } from '../dto/create-hero.dto';
import { UpdateHeroDto } from '../dto/update-hero.dto';

export function parseArray(data: string | string[]): string[] {
  return typeof data === 'string'
    ? data.split(',').map((item) => item.trim())
    : data || [];
}

export function parseNumberArray(data: string | number[]): number[] {
  return typeof data === 'string'
    ? data.split(',').map((id) => Number(id.trim()))
    : Array.isArray(data)
      ? data
      : [];
}

export function parseBoolean(data: string | boolean): boolean {
  return typeof data === 'string' ? data === 'true' : data;
}

export function transformHeroDto(heroDto: CreateHeroDto | UpdateHeroDto) {
  if (!heroDto.name) {
    throw new Error('Name is required');
  }
  return {
    name: heroDto.name,
    image_url: heroDto.image_url,
    traits: heroDto.traits,
    ideals: heroDto.ideals,
    bounds: heroDto.bounds,
    flaws: heroDto.flaws,
    armorBonus: Number(heroDto.armorBonus),
    user_id: heroDto.user_id,
    wis: Number(heroDto.wis),
    con: Number(heroDto.con),
    max_hp: Number(heroDto.max_hp),
    gold_coins: Number(heroDto.gold_coins),
    race_id: Number(heroDto.race_id),
    subrace_id: Number(heroDto.subrace_id),
    warlock_pact_id: Number(heroDto.warlock_pact_id),
    current_hp: Number(heroDto.current_hp),
    platinum_coins: Number(heroDto.platinum_coins),
    int: Number(heroDto.int),
    cha: Number(heroDto.cha),
    dex: Number(heroDto.dex),
    str: Number(heroDto.str),
    buff_hp: Number(heroDto.buff_hp),
    copper_coins: Number(heroDto.copper_coins),
    silver_coins: Number(heroDto.silver_coins),
    electrum_coins: Number(heroDto.electrum_coins),
    temp_hp: Number(heroDto.temp_hp),
    armor_id: Number(heroDto.armor_id),
    shield_id: Number(heroDto.shield_id),
    experience: Number(heroDto.experience),
    armor_bonus: Number(heroDto.armor_bonus),
    world_id: Number(heroDto.world_id),
    weapon_types_prof: parseArray(heroDto.weapon_types_prof ?? ''),
    languages_ids: parseNumberArray(heroDto.languages_ids ?? []),
    tools_ids: parseNumberArray(heroDto.tools_ids ?? []),
    armor_types_prof: parseArray(heroDto.armor_types_prof ?? ''),
    creation_done: parseBoolean(heroDto.creation_done ?? false),
  };
}
