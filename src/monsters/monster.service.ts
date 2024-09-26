import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { bigintToJSON } from 'src/utils/bigint-transformer';

@Injectable()
export class MonsterService {
  constructor(private prisma: PrismaService) {}

  async getAllMonsters() {
    const monster = await this.prisma.monsters.findMany();
    return bigintToJSON(monster);
  }

  async getMonsterById(id: number) {
    const monster = await this.prisma.monsters.findUnique({
      where: { id },
    });
    if (!monster) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
    return bigintToJSON(monster);
  }

  async createMonster(createMonsterDto: CreateMonsterDto) {
    const monster = await this.prisma.monsters.create({
      data: createMonsterDto,
    });
    return bigintToJSON(monster);
  }

  async updateMonster(id: number, updateMonsterDto: UpdateMonsterDto) {
    const updatedMonster = await this.prisma.monsters.update({
      where: { id },
      data: updateMonsterDto,
    });
    if (!updatedMonster) {
      throw new NotFoundException(`Monster with ID ${id} not found`);
    }
    return bigintToJSON(updatedMonster);
  }

  async deleteMonster(id: number) {
    const monster = await this.prisma.monsters.delete({
      where: { id },
    });
    return bigintToJSON(monster);
  }
}
