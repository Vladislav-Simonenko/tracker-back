import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { GetItemByIdDto } from './dto/get-item-id.dto';
import { GetItemDto } from './dto/get-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    return this.prisma.items.findMany();
  }

  //NOTE: add DTO ef needed
  async getItemById(id: string) {
    const item = await this.prisma.items.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async createItem(createItemDto: CreateItemDto) {
    return this.prisma.items.create({
      data: {
        ...createItemDto,
        world_id: createItemDto.world_id
          ? Number(createItemDto.world_id)
          : null,
        icon: createItemDto.icon || null,
      },
    });
  }

  async updateItem(id: string, updateItemDto: UpdateItemDto) {
    return this.prisma.items.update({
      where: { id },
      data: {
        ...updateItemDto,
        world_id: updateItemDto.world_id ?? null,
        icon: updateItemDto.icon ?? null,
        categories: Array.isArray(updateItemDto.categories)
          ? updateItemDto.categories
          : undefined,
      },
    });
  }

  async deleteItem(id: string) {
    await this.prisma.items.delete({
      where: { id },
    });
    return { message: `Item with ID ${id} deleted` };
  }
}
