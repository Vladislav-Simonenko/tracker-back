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
import { SubraceService } from './subraces.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFileName } from 'src/utils/file-utils';
import { CreateSubraceDto } from './dto/create-subraces.dto';
import { createSubraceSchema } from './schema/create-subrace.schema';
import { UpdateSubraceDto } from './dto/update-subraces.dto';
import { updateSubraceSchema } from './schema/update-subrace.schema';

@ApiTags('subrace')
@Controller('/api/subrace')
export class SubraceController {
  constructor(private readonly subraceService: SubraceService) {}

  @Get()
  async getAllsubrace() {
    return this.subraceService.getAllSubraces();
  }

  @Get(':id')
  async getSubraceById(@Param('id') id: number) {
    return this.subraceService.getSubraceById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new subrace with an image',
    schema: createSubraceSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/subraces',
        filename: generateFileName,
      }),
    }),
  )
  async createSubrace(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateSubraceDto,
  ) {
    const iconPath = file ? `/images/subraces/${file.filename}` : '';

    const createSubraceDto: CreateSubraceDto = {
      ...body,
      features_done:
        typeof body.features_done === 'string'
          ? body.features_done === 'true'
          : body.features_done,
      icon: iconPath,
    };

    return this.subraceService.createSubrace(createSubraceDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing subrace with an image',
    schema: updateSubraceSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/subrace',
        filename: generateFileName,
      }),
    }),
  )
  async updateSubrace(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateSubraceDto,
  ) {
    const iconPath = file ? `/images/subrace/${file.filename}` : '';

    const updateSubraceDto: UpdateSubraceDto = {
      ...body,
      features_done:
        typeof body.features_done === 'string'
          ? body.features_done === 'true'
          : body.features_done,
      icon: iconPath,
    };

    return this.subraceService.updateSubrace(updateSubraceDto, id);
  }

  @Delete(':id')
  async deleteSubrace(@Param('id') id: number) {
    return await this.subraceService.deleteSubrace(id);
  }
}
