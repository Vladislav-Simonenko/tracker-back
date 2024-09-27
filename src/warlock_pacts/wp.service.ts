import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { CreateWpDto } from './dto/create-wp.dto';
import { UpdateWpDto } from './dto/update-wp.dto';

@Injectable()
export class WpService {
  constructor(private prisma: PrismaService) {}

  async getAllWp() {
    const wp = await this.prisma.warlock_pacts.findMany();
    return bigintToJSON(wp);
  }

  async getWpById(id: number) {
    const wp = await this.prisma.warlock_pacts.findUnique({
      where: { id },
    });
    if (!wp) {
      throw new NotFoundException('warlock_pacts with ID ${id} not found');
    }
    return bigintToJSON(wp);
  }
  async createWp(createWpDto: CreateWpDto) {
    const newWp = await this.prisma.warlock_pacts.create({
      data: createWpDto,
    });
    return bigintToJSON(newWp);
  }

  async updateWp(id: number, updateWpDto: UpdateWpDto) {
    const updateWp = await this.prisma.warlock_pacts.update({
      where: { id },
      data: updateWpDto,
    });
    return bigintToJSON(updateWp);
  }

  async deleteWp(id: number) {
    const deletedWp = await this.prisma.warlock_pacts.delete({
      where: { id },
    });
    return bigintToJSON({
      message: `Warlock pacts with ID ${id} deleted`,
      deletedWp,
    });
  }
}
