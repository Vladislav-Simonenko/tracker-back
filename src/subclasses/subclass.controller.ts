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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SubclassService } from './subclass.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFileName } from 'src/utils/file-utils';
import { CreateSubclassDto } from './dto/create-subclass.dto';
import { createSubclassSchema } from './schema/create-subclass.schema';
import { UpdateSubclassDto } from './dto/update-subclass.dto';
import { updateSubclassSchema } from './schema/update-subclass.schema';

@ApiTags('subclass')
@Controller('/api/subclass')
export class SubclassController {
  constructor(private readonly subclassService: SubclassService) {}

  @Get()
  async getAllSublasses() {
    return await this.subclassService.getAllSubclasses();
  }

  @Get(':id')
  async getSubclassbyId(@Param('id') id: number) {
    return await this.subclassService.getSubclassById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new subclass with an image',
    schema: createSubclassSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/subclasses',
        filename: generateFileName,
      }),
    }),
  )
  async createSubclass(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateSubclassDto,
  ) {
    const iconPath = file ? `/images/subclasses/${file.filename}` : '';

    const createSubclassDto: CreateSubclassDto = {
      ...body,
      icon: iconPath,
    };

    return this.subclassService.createSubclass(createSubclassDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing subclass with an image',
    schema: updateSubclassSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/subclasses',
        filename: generateFileName,
      }),
    }),
  )
  async updateSubclass(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateSubclassDto,
  ) {
    const iconPath = file ? `/images/subclass/${file.filename}` : '';

    const updateSubclassDto: UpdateSubclassDto = {
      ...body,
      icon: iconPath,
    };
    return this.subclassService.updateSubclass(id, updateSubclassDto);
  }

  @Delete(':id')
  async deleteSubclass(@Param('id') id: number) {
    return await this.subclassService.deleteSubclass(id);
  }
}
