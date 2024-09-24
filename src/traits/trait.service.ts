import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';

@Injectable()
export class TraitService {
  constructor(private prisma: PrismaService) {}

  async getAllTraits() {
    return this.prisma.traits.findMany();
  }

  async getTraitById(id: string) {
    const trait = await this.prisma.traits.findUnique({ where: { id } });
    if (!trait) {
      throw new NotFoundException(`Trait with ID ${id} not found`);
    }
    return trait;
  }

  async createTrait(createTraitDto: CreateTraitDto) {
    return this.prisma.traits.create({ data: createTraitDto });
  }

  async updateTrait(id: string, updateTraitDto: UpdateTraitDto) {
    const trait = await this.prisma.traits.update({
      where: { id },
      data: updateTraitDto,
    });
    if (!trait) {
      throw new NotFoundException(`Trait with ID ${id} not found`);
    }
    return trait;
  }

  async deleteTrait(id: string) {
    return this.prisma.traits.delete({ where: { id } });
  }
}
