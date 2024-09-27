import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { CreateApsDto } from './dto/create-aps.dto';
import { UpdateApsDto } from './dto/update-aps.dto';

@Injectable()
export class ApsService {
  constructor(private prisma: PrismaService) {}

  async getAllAps() {
    const aps = await this.prisma.auto_prepared_spells.findMany();
    return bigintToJSON(aps);
  }

  async getApsById(id: number) {
    const aps = await this.prisma.auto_prepared_spells.findUnique({
      where: { id },
    });
    if (!aps) {
      throw new NotFoundException(
        `auto prepared spells with ID ${id} not found`,
      );
    }
    return bigintToJSON(aps);
  }

  async createAps(createApsDto: CreateApsDto) {
    const aps = await this.prisma.auto_prepared_spells.create({
      data: createApsDto,
    });
    return bigintToJSON(aps);
  }

  async updateAps(id: number, updateApsDto: UpdateApsDto) {
    const aps = await this.prisma.auto_prepared_spells.update({
      where: { id },
      data: updateApsDto,
    });
    if (!aps) {
      throw new NotFoundException(
        `auto prepared spells with ID ${id} not found`,
      );
    }
    return bigintToJSON(aps);
  }

  async deleteAps(id: number) {
    const aps = await this.prisma.auto_prepared_spells.delete({
      where: { id },
    });
    return bigintToJSON(aps);
  }
}
