import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { transformHeroDto } from 'src/heroes/utils/hero-utils';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { HeroGateway } from './heroes.gateway';
import { zip } from 'rxjs';
import { ENHANCER_TOKEN_TO_SUBTYPE_MAP } from '@nestjs/core/constants';

@Injectable()
export class HeroService {
  constructor(
    private prisma: PrismaService,
    private readonly heroGateway: HeroGateway,
  ) {}

  async getAllHeroes() {
    const heroes = await this.prisma.heroes.findMany();
    return bigintToJSON(heroes);
  }

  async getHeroById(id: number) {
    const hero = await this.prisma.heroes.findUnique({
      where: { id },
      include: {
        armors_heroes_armor_idToarmors: true,
        races: true,
        armors_heroes_shield_idToarmors: true,
        subraces: true,
        warlock_pacts: true,
        worlds: true,
        languages: true,
        tools: true,
        user: true,
      },
    });

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    return bigintToJSON(hero);
  }

  async createHero(createHeroDto: CreateHeroDto) {
    const transformedData = transformHeroDto(createHeroDto);

    const newHero = await this.prisma.heroes.create({
      data: transformedData,
    });

    this.heroGateway.server.emit('heroCreated', newHero);

    return bigintToJSON(newHero);
  }

  async updateHero(id: number, updateHeroDto: UpdateHeroDto) {
    const existingHero = await this.prisma.heroes.findUnique({
      where: { id },
    });

    if (!existingHero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    const transformedData = transformHeroDto(updateHeroDto);

    const updatedHero = await this.prisma.heroes.update({
      where: { id },
      data: transformedData,
    });

    this.heroGateway.server.emit('heroUpdated', bigintToJSON(updatedHero));

    return bigintToJSON(updatedHero);
  }

  async deleteHero(id: number) {
    const deletedHero = await this.prisma.heroes.delete({
      where: { id },
    });

    this.heroGateway.server.emit('heroDeleted', id);

    return bigintToJSON({
      message: `Hero with ID ${id} deleted`,
      deletedHero,
    });
  }

  async applyDamage(id: number, damage: number) {
    const hero = await this.prisma.heroes.findUnique({
      where: { id },
    });

    if (!hero) {
      throw new NotFoundException(`Герой с ID ${id} не найден`);
    }

    let remainingDamage = damage;

    let newTempHp = hero.temp_hp;
    if (remainingDamage > 0 && newTempHp > 0) {
      newTempHp -= remainingDamage;
      if (newTempHp < 0) {
        remainingDamage = -newTempHp;
        newTempHp = 0;
      } else {
        remainingDamage = 0;
      }
    }

    let newBuffHp = hero.buff_hp;
    if (remainingDamage > 0 && newBuffHp > 0) {
      newBuffHp -= remainingDamage;
      if (newBuffHp < 0) {
        remainingDamage = -newBuffHp;
        newBuffHp = 0;
      } else {
        remainingDamage = 0;
      }
    }

    let newCurrentHp = hero.current_hp - remainingDamage;
    newCurrentHp = newCurrentHp < 0 ? 0 : newCurrentHp;

    const updatedHero = await this.prisma.heroes.update({
      where: { id },
      data: {
        current_hp: newCurrentHp,
        temp_hp: newTempHp,
        buff_hp: newBuffHp,
      },
    });

    this.heroGateway.server.emit('heroUpdated', bigintToJSON(updatedHero));

    return bigintToJSON(updatedHero);
  }

  async applyHealing(id: number, healing: number) {
    const hero = await this.prisma.heroes.findUnique({
      where: { id },
    });

    if (!hero) {
      throw new NotFoundException(`Герой с ID ${id} не найден`);
    }

    let newCurrentHp = hero.current_hp + healing;
    newCurrentHp = newCurrentHp > hero.max_hp ? hero.max_hp : newCurrentHp; // Не превышаем максимальные хп

    const updatedHero = await this.prisma.heroes.update({
      where: { id },
      data: {
        current_hp: newCurrentHp,
      },
    });

    this.heroGateway.server.emit('heroUpdated', bigintToJSON(updatedHero));

    return bigintToJSON(updatedHero);
  }

  async addTempHp(id: number, tempHp: number) {
    const hero = await this.prisma.heroes.findUnique({
      where: { id },
    });

    if (!hero) {
      throw new NotFoundException(`Герой с ID ${id} не найден`);
    }

    const newTempHp = hero.temp_hp + tempHp;

    const updatedHero = await this.prisma.heroes.update({
      where: { id },
      data: {
        temp_hp: newTempHp,
      },
    });

    this.heroGateway.server.emit('heroUpdated', bigintToJSON(updatedHero));

    return bigintToJSON(updatedHero);
  }

  async addCoins(
    id: number,
    coins: Partial<{
      copper: number;
      silver: number;
      electrum: number;
      gold: number;
      platinum: number;
    }>,
  ) {
    const hero = await this.prisma.heroes.findUnique({
      where: { id },
    });

    if (!hero) {
      throw new NotFoundException(`Герой с ID ${id} не найден`);
    }

    const updatedData = {
      copper_coins:
        coins.copper !== undefined
          ? hero.copper_coins + coins.copper
          : hero.copper_coins,
      silver_coins:
        coins.silver !== undefined
          ? hero.silver_coins + coins.silver
          : hero.silver_coins,
      electrum_coins:
        coins.electrum !== undefined
          ? hero.electrum_coins + coins.electrum
          : hero.electrum_coins,
      gold_coins:
        coins.gold !== undefined
          ? hero.gold_coins + coins.gold
          : hero.gold_coins,
      platinum_coins:
        coins.platinum !== undefined
          ? hero.platinum_coins + coins.platinum
          : hero.platinum_coins,
    };

    const updatedHero = await this.prisma.heroes.update({
      where: { id },
      data: updatedData,
    });

    this.heroGateway.server.emit('heroUpdated', bigintToJSON(updatedHero));

    return bigintToJSON(updatedHero);
  }

  async addBuffHp(id: number, buffHp: number) {
    const hero = await this.prisma.heroes.findUnique({
      where: { id },
    });

    if (!hero) {
      throw new NotFoundException(`Герой с ID ${id} не найден`);
    }

    const newBuffHp = hero.buff_hp + buffHp;

    const updatedHero = await this.prisma.heroes.update({
      where: { id },
      data: {
        buff_hp: newBuffHp,
      },
    });

    this.heroGateway.server.emit('heroUpdated', bigintToJSON(updatedHero));

    return bigintToJSON(updatedHero);
  }
}
