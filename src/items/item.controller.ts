import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ItemService } from './item.service';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { diskStorage } from 'multer';
import { createItemSchema } from './schema/create-item.schema';
import { updateItemShema } from './schema/update-item.schema';
import { generateFileName } from 'src/utils/file-utils';
@ApiTags('items')
@Controller('/api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAllItems() {
    return this.itemService.getAllItems();
  }

  @Get(':id')
  getItemById(@Param('id') id: string) {
    return this.itemService.getItemById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new item with an image',
    schema: createItemSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/items',
        filename: generateFileName,
      }),
    }),
  )
  async createItem(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateItemDto,
  ) {
    const iconPath = file ? `/images/items/${file.filename}` : null;

    const createItemDto: CreateItemDto = {
      ...body,
      categories: Array.isArray(body.categories)
        ? body.categories
        : [body.categories],
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      icon: iconPath,
    };

    return this.itemService.createItem(createItemDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing item with an image',
    schema: updateItemShema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/items',
        filename: generateFileName,
      }),
    }),
  )
  async updateItem(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateItemDto,
  ) {
    const iconPath = file ? `/images/items/${file.filename}` : null;

    const updateItemDto: UpdateItemDto = {
      ...body,
      categories:
        Array.isArray(body.categories) && body.categories.length > 0
          ? body.categories
          : [],
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      world_id: body.world_id,
      icon: iconPath,
    };

    return this.itemService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return await this.itemService.deleteItem(id);
  }
}
