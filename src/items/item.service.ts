import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    return this.prisma.item.findMany();
  }

  async getItemById(id: number) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async createItem(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        ...createItemDto,
        icon: createItemDto.icon || null,
        world_id: createItemDto.world_id
          ? Number(createItemDto.world_id)
          : null,
      },
    });
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.prisma.item.update({
      where: { id },
      data: {
        ...updateItemDto,
        icon: updateItemDto.icon ?? null,
        world_id: updateItemDto.world_id ?? null,
        categories: Array.isArray(updateItemDto.categories)
          ? updateItemDto.categories
          : undefined,
      },
    });
    return item;
  }

  async deleteItem(id: number) {
    await this.prisma.item.delete({
      where: { id },
    });
    return { message: `Item with ID ${id} deleted` };
  }
}
