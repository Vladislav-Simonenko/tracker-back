import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';

@Injectable()
export class ArmorService {
  constructor(private prisma: PrismaService) {}

  async getAllArmors() {
    const armors = await this.prisma.armors.findMany();
    return bigintToJSON(armors);
  }

  async getArmorById(id: number) {
    const armor = await this.prisma.armors.findUnique({
      where: { id },
    });
    if (!armor) {
      throw new NotFoundException(`Armor with ID ${id} not found`);
    }
    return bigintToJSON(armor);
  }

  async createArmor(createArmorDto: CreateArmorDto) {
    const armor = await this.prisma.armors.create({
      data: createArmorDto,
    });
    return bigintToJSON(armor);
  }

  async updateArmor(id: number, updateArmorDto: UpdateArmorDto) {
    const armor = await this.prisma.armors.update({
      where: { id },
      data: updateArmorDto,
    });
    return bigintToJSON(armor);
  }

  async deleteArmor(id: number) {
    const armor = await this.prisma.armors.delete({
      where: { id },
    });
    return bigintToJSON({
      message: 'The armor has been successfully removed!',
    });
  }
}
