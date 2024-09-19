import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ItemService } from './item.service';
import { ApiTags, ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createItemSchema } from './shema/create-item.shema';
import { updateItemShema } from './shema/update-item.shema';
import { GetItemByIdDto } from './dto/get-item-id.dto';
import { DeleteItemDto } from './dto/delete-item.dto';
import { GetItemDto } from './dto/get-item.dto';

@ApiTags('items')
@Controller('/api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiOkResponse({ type: [GetItemDto] })
  async getAllItems() {
    try {
      return await this.itemService.getAllItems();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve items');
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: GetItemByIdDto })
  async getItemById(@Param() params: GetItemByIdDto) {
    try {
      return await this.itemService.getItemById(params.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Item with ID ${params.id} not found`);
      }
      throw new InternalServerErrorException('Failed to retrieve item');
    }
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
    schema: updateItemShema,
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

    return this.itemService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteItemDto })
  async deleteItem(@Param() params: DeleteItemDto) {
    try {
      return await this.itemService.deleteItem(params.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Item with ID ${params.id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete item');
    }
  }
}
