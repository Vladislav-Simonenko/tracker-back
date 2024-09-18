import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) {}

  async getAllHeroes() {
    return this.prisma.heroes.findMany();
  }

  async getHeroById(id: number) {
    const hero = await this.prisma.heroes.findUnique({
      where: { id },
    });
    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }
    return hero;
  }

  async createHero(createHeroDto: CreateHeroDto) {
    return this.prisma.heroes.create({
      data: createHeroDto,
    });
  }

  async updateHero(id: number, updateHeroDto: UpdateHeroDto) {
    const hero = await this.prisma.heroes.update({
      where: { id },
      data: updateHeroDto,
    });
    return hero;
  }

  async deleteHero(id: number) {
    await this.prisma.heroes.delete({
      where: { id },
    });
    return { message: `Hero with ID ${id} deleted` };
  }
}
