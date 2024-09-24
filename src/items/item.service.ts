import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { bigintToJSON } from 'src/utils/bigint-transformer';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    const items = await this.prisma.items.findMany();
    return bigintToJSON(items);
  }

  async getItemById(id: string) {
    const item = await this.prisma.items.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return bigintToJSON(item);
  }

  async createItem(createItemDto: CreateItemDto) {
    const newItem = await this.prisma.items.create({
      data: createItemDto,
    });
    return bigintToJSON(newItem);
  }

  async updateItem(id: string, updateItemDto: UpdateItemDto) {
    const updatedItem = await this.prisma.items.update({
      where: { id },
      data: updateItemDto,
    });
    return bigintToJSON(updatedItem);
  }

  async deleteItem(id: string) {
    const deletedItem = await this.prisma.items.delete({
      where: { id },
    });
    return bigintToJSON({
      message: `Item with ID ${id} deleted`,
      deletedItem,
    });
  }
}
