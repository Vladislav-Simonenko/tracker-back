import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { CreateMitemDto } from './dto/create-mitem.dto';
import { UpdateMitemDto } from './dto/update-mitem.dto';
import { parseArray, parseNumberArray } from 'src/heroes/utils/hero-utils';

@Injectable()
export class MitemService {
  constructor(private prisma: PrismaService) {}

  async getAllMitems() {
    const mitems = await this.prisma.magic_items.findMany();
    return bigintToJSON(mitems);
  }

  async getMitemById(id: string) {
    const mitem = await this.prisma.magic_items.findUnique({
      where: { id },
    });
    if (!mitem) {
      throw new NotFoundException(`Magic Item with ID ${id} not found`);
    }
    return bigintToJSON(mitem);
  }

  async createMitem(createMitemDto: CreateMitemDto) {
    const newMitem = await this.prisma.magic_items.create({
      data: {
        ...createMitemDto,
        detailCustomization:
          typeof createMitemDto.detailCustomization === 'string'
            ? createMitemDto.detailCustomization.split(',')
            : createMitemDto.detailCustomization || [],

        detailType:
          typeof createMitemDto.detailType === 'string'
            ? createMitemDto.detailType.split(',')
            : createMitemDto.detailType || [],

        allowed_weapon_ids:
          typeof createMitemDto.allowed_weapon_ids === 'string'
            ? createMitemDto.allowed_weapon_ids.split(',')
            : createMitemDto.allowed_weapon_ids || [],
        allowed_weapon_types:
          typeof createMitemDto.allowed_weapon_types === 'string'
            ? [parseInt(createMitemDto.allowed_weapon_types)]
            : (createMitemDto.allowed_weapon_types as number[]) || [],

        customization:
          createMitemDto.customization === 'true'
            ? true
            : createMitemDto.customization === 'false'
              ? false
              : Boolean(createMitemDto.customization),
        world_id: createMitemDto.world_id
          ? BigInt(createMitemDto.world_id)
          : null,
      },
    });
    return bigintToJSON(newMitem);
  }

  async updateMitem(id: string, updateMitemDto: UpdateMitemDto) {
    const updatedMitem = await this.prisma.magic_items.update({
      where: { id },
      data: {
        ...updateMitemDto,
        detailCustomization:
          typeof updateMitemDto.detailCustomization === 'string'
            ? updateMitemDto.detailCustomization.split(',')
            : updateMitemDto.detailCustomization || [],

        detailType:
          typeof updateMitemDto.detailType === 'string'
            ? updateMitemDto.detailType.split(',')
            : updateMitemDto.detailType || [],

        allowed_weapon_ids:
          typeof updateMitemDto.allowed_weapon_ids === 'string'
            ? updateMitemDto.allowed_weapon_ids.split(',')
            : updateMitemDto.allowed_weapon_ids || [],
        allowed_weapon_types:
          typeof updateMitemDto.allowed_weapon_types === 'string'
            ? [parseInt(updateMitemDto.allowed_weapon_types)]
            : (updateMitemDto.allowed_weapon_types as number[]) || [],

        customization:
          updateMitemDto.customization === 'true'
            ? true
            : updateMitemDto.customization === 'false'
              ? false
              : Boolean(updateMitemDto.customization),
        world_id: updateMitemDto.world_id
          ? BigInt(updateMitemDto.world_id)
          : null,
      },
    });
    return bigintToJSON(updatedMitem);
  }

  async deleteMitem(id: string) {
    const deletedMitem = await this.prisma.magic_items.delete({
      where: { id },
    });
    return bigintToJSON({
      message: `Magic item with ID ${id} deleted`,
      deletedMitem,
    });
  }
}
