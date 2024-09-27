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
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { generateFileName } from 'src/utils/file-utils';
import { MitemService } from './mitem.service';
import { CreateMitemDto } from './dto/create-mitem.dto';
import { UpdateMitemDto } from './dto/update-mitem.dto';
import { updateMitemSchema } from './schema/update-mitem.schema';
import { createMitemSchema } from './schema/create-mitem.schema';
@ApiTags('magic-items')
@Controller('/api/magic-items')
export class MitemController {
  constructor(private readonly mitemService: MitemService) {}

  @Get()
  async getAllMitems() {
    return this.mitemService.getAllMitems();
  }

  @Get(':id')
  getMitemById(@Param('id') id: string) {
    return this.mitemService.getMitemById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new magic item with an image',
    schema: createMitemSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/magic-items',
        filename: generateFileName,
      }),
    }),
  )
  async createMitem(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateMitemDto,
  ) {
    const iconPath = file ? `/images/magic-items/${file.filename}` : '';

    const createMitemDto: CreateMitemDto = {
      ...body,
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      icon: iconPath,
      world_id: body.world_id,
    };

    return this.mitemService.createMitem(createMitemDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing magic item with an image',
    schema: updateMitemSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/magic-items',
        filename: generateFileName,
      }),
    }),
  )
  async updateItem(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateMitemDto,
  ) {
    const iconPath = file ? `/images/magic-items/${file.filename}` : '';

    const updateMitemDto: UpdateMitemDto = {
      ...body,
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      world_id: body.world_id,
      icon: iconPath,
    };

    return this.mitemService.updateMitem(id, updateMitemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string) {
    return await this.mitemService.deleteMitem(id);
  }
}
