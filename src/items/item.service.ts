import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { GetItemByIdDto } from './dto/get-item-id.dto';
import { GetItemDto } from './dto/get-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    try {
      return await this.prisma.items.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve items from the database',
      );
    }
  }

  //NOTE: add DTO ef needed
  async getItemById(id: string) {
    try {
      const item = await this.prisma.items.findUnique({ where: { id } });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error fetching item from the database',
      );
    }
  }

  async createItem(createItemDto: CreateItemDto) {
    try {
      return await this.prisma.items.create({
        data: {
          ...createItemDto,
          world_id: createItemDto.world_id
            ? Number(createItemDto.world_id)
            : null,
          icon: createItemDto.icon || null,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating item');
    }
  }

  async updateItem(id: string, updateItemDto: UpdateItemDto) {
    try {
      return await this.prisma.items.update({
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error updating item');
    }
  }

  async deleteItem(id: string) {
    try {
      await this.prisma.items.delete({ where: { id } });
      return { message: `Item with ID ${id} deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Error deleting item');
    }
  }
}
