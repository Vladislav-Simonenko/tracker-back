import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { transformHeroDto } from 'src/heroes/utils/hero-utils';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { HeroesGateway } from './heroes.gateway'; // Подключаем HeroesGateway

@Injectable()
export class HeroService {
  constructor(
    private prisma: PrismaService,
    private heroesGateway: HeroesGateway, // Инжектим HeroesGateway
  ) {}

  async getAllHeroes() {
    const heroes = await this.prisma.heroes.findMany();
    return bigintToJSON(heroes);
  }

  async getHeroById(id: number) {
    const hero = await this.prisma.heroes.findUnique({
      where: { id },
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

    // Отправляем обновления через WebSocket
    this.heroesGateway.server.emit('heroesUpdated', await this.getAllHeroes());

    return bigintToJSON(newHero);
  }

  async updateHero(id: number, updateHeroDto: UpdateHeroDto) {
    const transformedData = transformHeroDto(updateHeroDto);

    const updatedHero = await this.prisma.heroes.update({
      where: { id },
      data: transformedData,
    });

    // Отправляем обновления через WebSocket
    this.heroesGateway.server.emit('heroesUpdated', await this.getAllHeroes());

    return bigintToJSON(updatedHero);
  }

  async deleteHero(id: number) {
    const deletedHero = await this.prisma.heroes.delete({
      where: { id },
    });

    // Отправляем обновления через WebSocket
    this.heroesGateway.server.emit('heroesUpdated', await this.getAllHeroes());

    return bigintToJSON({
      message: `Hero with ID ${id} deleted`,
      deletedHero,
    });
  }
}
