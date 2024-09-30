import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSsDto } from './dto/create-ss.dto';
import { UpdateSsDto } from './dto/update-ss.dto';
import { bigintToJSON } from 'src/utils/bigint-transformer';

@Injectable()
export class SsService {
  constructor(private prisma: PrismaService) {}

  async getAllSs() {
    const ss = await this.prisma.subclass_spells.findMany();
    return bigintToJSON(ss);
  }

  async getSsById(subclass_id: number, spell_id: string) {
    const ss = await this.prisma.subclass_spells.findUnique({
      where: {
        subclass_id_spell_id: {
          subclass_id: BigInt(subclass_id),
          spell_id,
        },
      },
    });
    if (!ss) {
      throw new NotFoundException(
        `Subclass spell with subclass_id ${subclass_id} and spell_id ${spell_id} not found`,
      );
    }
    return bigintToJSON(ss);
  }

  async createSs(createSsDto: CreateSsDto) {
    const newSs = await this.prisma.subclass_spells.create({
      data: {
        subclass_id: BigInt(createSsDto.subclass_id),
        spell_id: createSsDto.spell_id,
      },
    });
    return bigintToJSON(newSs);
  }

  async updateSs(
    subclass_id: number,
    spell_id: string,
    updateSsDto: UpdateSsDto,
  ) {
    const updatedSs = await this.prisma.subclass_spells.update({
      where: {
        subclass_id_spell_id: {
          subclass_id: BigInt(subclass_id),
          spell_id,
        },
      },
      data: {
        spell_id: updateSsDto.spell_id,
      },
    });
    return bigintToJSON(updatedSs);
  }

  async deleteSs(subclass_id: number, spell_id: string) {
    const deletedSs = await this.prisma.subclass_spells.delete({
      where: {
        subclass_id_spell_id: {
          subclass_id: BigInt(subclass_id),
          spell_id,
        },
      },
    });
    return bigintToJSON({
      message: `Subclass spell with subclass_id ${subclass_id} and spell_id ${spell_id} deleted`,
      deletedSs,
    });
  }
}
