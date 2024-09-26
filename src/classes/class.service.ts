import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClassDto } from './dto/update-class.dto';
import { CreateClassDto } from './dto/create-class.dto';
@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async getAllClass() {
    return this.prisma.classes.findMany();
  }

  async getClassById(id: number) {
    const getclass = await this.prisma.classes.findUnique({
      where: { id },
    });
    if (!getclass) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return getclass;
  }

  async createClass(createClassDto: CreateClassDto) {
    const createClassDtoWithConvertedFields = {
      ...createClassDto,
      hit_dice: Number(createClassDto.hit_dice),
      subclass_level: Number(createClassDto.subclass_level),
      metamagic:
        typeof createClassDto.metamagic === 'string'
          ? createClassDto.metamagic === 'true'
          : Boolean(createClassDto.metamagic),
    };

    return this.prisma.classes.create({
      data: createClassDtoWithConvertedFields,
    });
  }

  async updateClass(id: number, updateClassDto: UpdateClassDto) {
    const updateClassDtoWithConvertedFields = {
      ...updateClassDto,
      hit_dice: Number(updateClassDto.hit_dice),
      subclass_level: Number(updateClassDto.subclass_level),
      metamagic:
        typeof updateClassDto.metamagic === 'string'
          ? updateClassDto.metamagic === 'true'
          : Boolean(updateClassDto.metamagic),
    };

    const updatedClass = await this.prisma.classes.update({
      where: { id: Number(id) },
      data: updateClassDtoWithConvertedFields,
    });

    if (!updatedClass) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    return updatedClass;
  }
  async deleteClass(id: number) {
    await this.prisma.classes.delete({
      where: { id },
    });
    return { message: `Class with ID ${id} deleted` };
  }
}
