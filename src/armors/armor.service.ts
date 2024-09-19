import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';

@Injectable()
export class ArmorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArmorDto: CreateArmorDto) {
    const armor = await this.prisma.armors.create({
      data: {
        ...createArmorDto,
        icon: createArmorDto.icon,
      },
    });
    return this.transformBigInt(armor);
  }

  async findAll() {
    const armors = await this.prisma.armors.findMany();
    return armors.map((armor) => this.transformBigInt(armor));
  }

  async findOne(id: number) {
    const armor = await this.prisma.armors.findUnique({
      where: { id },
    });
    return this.transformBigInt(armor);
  }

  async update(id: number, updateArmorDto: UpdateArmorDto) {
    const armor = await this.prisma.armors.update({
      where: { id },
      data: {
        ...updateArmorDto,
        icon: updateArmorDto.icon,
      },
    });
    return this.transformBigInt(armor);
  }

  async remove(id: number) {
    const armor = await this.prisma.armors.delete({
      where: { id },
    });
    return this.transformBigInt(armor);
  }

  private transformBigInt(entity: any) {
    return JSON.parse(
      JSON.stringify(entity, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
  }
}
