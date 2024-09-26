import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFileName } from 'src/utils/file-utils';
import { ClassService } from './class.service';
import { CreateClassSchema } from './schema/create-class.schema';
import { UpdateClassSchema } from './schema/update-class.chema';

@ApiTags('class')
@Controller('/api/class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  getAllclass() {
    return this.classService.getAllClass();
  }

  @Get(':id')
  getClassById(@Param('id') id: string) {
    return this.classService.getClassById(+id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new class with an image',
    schema: CreateClassSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/class',
        filename: generateFileName,
      }),
    }),
  )
  async createclass(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateClassDto,
  ) {
    const imageUrl = file ? `/images/class/${file.filename}` : null;

    const createclassDto: CreateClassDto = {
      ...body,
      icon: imageUrl || body.icon,
    };

    return this.classService.createClass(createclassDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create class with an image',
    schema: UpdateClassSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/class',
        filename: generateFileName,
      }),
    }),
  )
  async updateClass(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateClassDto,
  ) {
    const imageUrl = file ? `/images/class/${file.filename}` : null;

    const createClassDto: UpdateClassDto = {
      ...body,
      icon: imageUrl || body.icon,
    };

    return this.classService.updateClass(id, createClassDto);
  }

  @Delete(':id')
  deleteClass(@Param('id') id: string) {
    return this.classService.deleteClass(+id);
  }
}
