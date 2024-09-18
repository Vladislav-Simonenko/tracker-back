import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

@Injectable()
export class WeaponsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWeaponDto: CreateWeaponDto) {
    try {
      const weapon = await this.prisma.weapons.create({
        data: createWeaponDto,
      });
      return this.transformBigInt(weapon);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const weapons = await this.prisma.weapons.findMany();
    return weapons.map((weapon) => this.transformBigInt(weapon));
  }

  async findOne(id: string) {
    const weapon = await this.prisma.weapons.findUnique({
      where: { id },
    });
    if (!weapon) {
      throw new NotFoundException(`Weapon with id ${id} not found`);
    }
    return this.transformBigInt(weapon);
  }

  async update(id: string, updateWeaponDto: UpdateWeaponDto) {
    try {
      const weapon = await this.prisma.weapons.findUnique({
        where: { id },
      });
      if (!weapon) {
        throw new NotFoundException(`Weapon with id ${id} not found`);
      }

      return this.prisma.weapons.update({
        where: { id },
        data: updateWeaponDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const weapon = await this.prisma.weapons.findUnique({
        where: { id },
      });
      if (!weapon) {
        throw new NotFoundException(`Weapon with id ${id} not found`);
      }

      return this.prisma.weapons.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  private transformBigInt(entity: any) {
    return JSON.parse(
      JSON.stringify(entity, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
  }
}
