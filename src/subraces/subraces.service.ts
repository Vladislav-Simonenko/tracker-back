import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSubraceDto } from './dto/create-subraces.dto';
import { UpdateSubraceDto } from './dto/update-subraces.dto';

@Injectable()
export class SubraceService {
  constructor(private prisma: PrismaService) {}

  async getAllSubraces() {
    return await this.prisma.subraces.findMany();
  }

  async getSubraceById(id: number) {
    const subrace = await this.prisma.subraces.findUnique({
      where: { id: Number(id) },
    });
    if (!subrace) {
      throw new NotFoundException(`Subrace with ID ${id} not found`);
    }
    return subrace;
  }

  async createSubrace(createSubraceDto: CreateSubraceDto) {
    const subrace = {
      ...createSubraceDto,
      race_id: Number(createSubraceDto.race_id),
      speed: Number(createSubraceDto.speed),
    };

    return this.prisma.subraces.create({
      data: subrace,
    });
  }

  async updateSubrace(updateSubraceDto: UpdateSubraceDto, id: number) {
    const subrace = {
      ...updateSubraceDto,
      race_id: Number(updateSubraceDto.race_id),
      speed: Number(updateSubraceDto.speed),
    };

    const updatedSubrace = await this.prisma.subraces.update({
      where: { id: Number(id) },
      data: subrace,
    });

    if (!updatedSubrace) {
      throw new NotFoundException(`Subrace with ID ${id} not found`);
    }

    return updatedSubrace;
  }

  async deleteSubrace(id: number) {
    const subrace = await this.prisma.subraces.delete({
      where: { id: Number(id) },
    });
    return {
      message: `Subrace with ID ${id} deleted`,
      subrace,
    };
  }
}
