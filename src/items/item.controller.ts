import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { extname } from 'path';

@ApiTags('items')
@Controller('/api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAllItems() {
    return this.itemService.getAllItems();
  }

  @Get(':id')
  async getItemById(@Param('id') id: string) {
    return this.itemService.getItemById(Number(id));
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new item with an image',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name_rus: { type: 'string' },
        name_eng: { type: 'string' },
        homebrew: { type: 'boolean' },
        price: { type: 'string' },
        source: { type: 'string' },
        weight: { type: 'string' },
        description: { type: 'string' },
        categories: {
          type: 'array',
          items: { type: 'string' },
        },
        world_id: { type: 'number' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createItem(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateItemDto,
  ) {
    const iconPath = file ? `/images/${file.filename}` : null;

    const createItemDto: CreateItemDto = {
      ...body,
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      world_id: body.world_id || null,
      categories: Array.isArray(body.categories)
        ? body.categories
        : [body.categories],
      icon: iconPath,
    };

    return this.itemService.createItem(createItemDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing item with an image',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name_rus: { type: 'string' },
        name_eng: { type: 'string' },
        homebrew: { type: 'boolean' },
        price: { type: 'string' },
        source: { type: 'string' },
        weight: { type: 'string' },
        description: { type: 'string' },
        categories: {
          type: 'array',
          items: { type: 'string' },
        },
        world_id: { type: 'number' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateItem(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateItemDto,
  ) {
    const iconPath = file ? `/images/${file.filename}` : null;

    const updateItemDto: UpdateItemDto = {
      ...body,
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      world_id: body.world_id || null,
      categories: Array.isArray(body.categories)
        ? body.categories
        : [body.categories],
      icon: iconPath,
    };

    return this.itemService.updateItem(Number(id), updateItemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem(Number(id));
  }
}
