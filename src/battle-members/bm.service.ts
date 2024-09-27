import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { CreateBmDto } from './dto/create-bm.dto';
import { UpdateBmDto } from './dto/update-bm.dto';

@Injectable()
export class BmService {
  constructor(private prisma: PrismaService) {}

  async getAllBm() {
    const bm = await this.prisma.battle_members.findMany();
    return bigintToJSON(bm);
  }

  async getBmById(id: number) {
    const bm = await this.prisma.battle_members.findUnique({
      where: { id },
    });
    if (!bm) {
      throw new NotFoundException('battle members with ID ${id} not found');
    }
    return bigintToJSON(bm);
  }

  async createBm(createBmDto: CreateBmDto) {
    const newBm = await this.prisma.battle_members.create({
      data: createBmDto,
    });
    return bigintToJSON(newBm);
  }

  async updateBm(id: number, updateBmDto: UpdateBmDto) {
    const updateBm = await this.prisma.battle_members.update({
      where: { id },
      data: updateBmDto,
    });
    return bigintToJSON(updateBm);
  }

  async deleteBm(id: number) {
    const deletedBm = await this.prisma.battle_members.delete({
      where: { id },
    });
    return bigintToJSON({
      message: `battle members with ID ${id} deleted`,
      deletedBm,
    });
  }
}
