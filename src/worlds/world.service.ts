import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { CreateWorldDto } from './dto/create-world.dto';
import { UpdateWorldDto } from './dto/update-world.dto';

@Injectable()
export class WorldService {
  constructor(private prisma: PrismaService) {}

  async getAllWorlds() {
    const worlds = await this.prisma.worlds.findMany();
    return bigintToJSON(worlds);
  }

  async getWorldById(id: number) {
    const world = await this.prisma.worlds.findUnique({
      where: { id },
    });
    if (!world) {
      throw new NotFoundException(`World with ID ${id} not found`);
    }
    return bigintToJSON(world);
  }

  async createWorld(createWorldDto: CreateWorldDto) {
    const newWorld = await this.prisma.worlds.create({
      data: createWorldDto,
    });
    return bigintToJSON(newWorld);
  }

  async updateWorld(id: number, updateWorldDto: UpdateWorldDto) {
    const updateWorld = await this.prisma.worlds.update({
      where: { id },
      data: updateWorldDto,
    });
    return bigintToJSON(updateWorld);
  }

  async deleteWorld(id: number) {
    const deletedWorld = await this.prisma.worlds.delete({
      where: { id },
    });
    return bigintToJSON({
      message: `World with ID ${id} deleted`,
      deletedWorld,
    });
  }
}
