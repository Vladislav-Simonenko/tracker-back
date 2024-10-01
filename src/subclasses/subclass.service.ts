import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateSubclassDto } from './dto/create-subclass.dto';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { UpdateSubclassDto } from './dto/update-subclass.dto';

@Injectable()
export class SubclassService {
  constructor(private prisma: PrismaService) {}

  async getAllSubclasses() {
    const subclass = await this.prisma.subclasses.findMany();
    return bigintToJSON(subclass);
  }

  async getSubclassById(id: number) {
    const subclass = await this.prisma.subclasses.findUnique({
      where: { id: Number(id) },
    });
    if (!subclass) {
      throw new NotFoundException(`Subclass with ID ${id} not found`);
    }
    return bigintToJSON(subclass);
  }

  async createSubclass(createSubclassDto: CreateSubclassDto) {
    const subclass = {
      ...createSubclassDto,
      class_id: Number(createSubclassDto.class_id),
    };

    const createsubclass = await this.prisma.subclasses.create({
      data: subclass,
    });

    return bigintToJSON(createsubclass);
  }

  async updateSubclass(id: number, updateSubclassDto: UpdateSubclassDto) {
    const subclass = {
      ...updateSubclassDto,
      class_id: Number(updateSubclassDto.class_id),
    };

    const updatedSubclass = await this.prisma.subclasses.update({
      where: { id: Number(id) },
      data: subclass,
    });

    if (!updatedSubclass) {
      throw new NotFoundException(`Subclass with ID ${id} not found`);
    }

    return bigintToJSON(updatedSubclass);
  }

  async deleteSubclass(id: number) {
    const subclass = await this.prisma.subclasses.delete({
      where: { id: Number(id) },
    });
    return bigintToJSON({
      message: `The subclass has ben successfully removed!`,
      subclass,
    });
  }
}
