import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';

@Injectable()
export class SpellService {
  constructor(private prisma: PrismaService) {}

  async getAllSpells() {
    const spells = await this.prisma.spells.findMany();
    return bigintToJSON(spells);
  }

  async getSpellById(id: string) {
    const spell = await this.prisma.spells.findUnique({
      where: { id },
    });
    if (!spell) {
      throw new NotFoundException(`Spell with ID ${id} not found`);
    }
    return bigintToJSON(spell);
  }

  async createSpell(createSpellDto: CreateSpellDto) {
    const spell = await this.prisma.spells.create({
      data: createSpellDto,
    });
    return bigintToJSON(spell);
  }

  async updateSpell(id: string, updateSpellDto: UpdateSpellDto) {
    const spell = await this.prisma.spells.update({
      where: { id },
      data: updateSpellDto,
    });
    return bigintToJSON(spell);
  }

  async deleteSpell(id: string) {
    const spell = await this.prisma.spells.delete({
      where: { id },
    });
    return bigintToJSON({
      message: 'The spell has been successfully removed!',
    });
  }
}
