import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

@Injectable()
export class WeaponsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWeaponDto: CreateWeaponDto) {
    const weapon = await this.prisma.weapons.create({
      data: createWeaponDto,
    });
    return this.transformBigInt(weapon);
  }

  async findAll() {
    const weapons = await this.prisma.weapons.findMany();
    return weapons.map((weapon) => this.transformBigInt(weapon));
  }

  async findOne(id: string) {
    const weapon = await this.prisma.weapons.findUnique({
      where: { id },
    });
    return this.transformBigInt(weapon);
  }

  async update(id: string, updateWeaponDto: UpdateWeaponDto) {
    return this.prisma.weapons.update({
      where: { id },
      data: updateWeaponDto,
    });
  }

  async remove(id: string) {
    const weapon = await this.prisma.weapons.delete({
      where: { id },
    });
    return this.transformBigInt(weapon);
  }

  private transformBigInt(entity: any) {
    return JSON.parse(
      JSON.stringify(entity, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
  }
}
