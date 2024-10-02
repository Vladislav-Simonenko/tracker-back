import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateTsDto } from './dto/create-ts.dto';
import { UpdateTsDto } from './dto/update-ts.dto';

@Injectable()
export class TsService {
  constructor(private prisma: PrismaService) {}

  async getAllTs() {
    return await this.prisma.trait_spells.findMany();
  }

  async getTsById(trait_id: string, spell_id: string) {
    const ts = await this.prisma.trait_spells.findUnique({
      where: {
        trait_id_spell_id: {
          spell_id,
          trait_id,
        },
      },
    });
    if (!ts) {
      throw new NotFoundException(
        `Trait spell with trait id ${trait_id} and spell id ${spell_id} not found.`,
      );
    }
    return ts;
  }

  async createTs(createTsDto: CreateTsDto) {
    return await this.prisma.trait_spells.create({
      data: createTsDto,
    });
  }

  async updateTs(trait_id: string, spell_id: string, updateTsDto: UpdateTsDto) {
    return await this.prisma.trait_spells.update({
      where: {
        trait_id_spell_id: {
          trait_id,
          spell_id,
        },
      },
      data: {
        trait_id,
        spell_id,
      },
    });
  }

  async DeleteTs(trait_id: string, spell_id: string) {
    const ts = this.prisma.trait_spells.delete({
      where: {
        trait_id_spell_id: {
          trait_id,
          spell_id,
        },
      },
    });
    return {
      message: `Trait spell with trait_id ${trait_id} and spell_id ${spell_id} deleted`,
      ts,
    };
  }
}
