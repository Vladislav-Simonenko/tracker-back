import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArmorsService } from './armor.service';
import { createArmorShema } from './shema/create-armor.shema';
import { updateArmorShema } from './shema/update-armor.shema';
import { DeleteArmorDto } from './dto/delete-armor.dto';
import { GetArmorDto } from './dto/get-armor.dto';

@ApiTags('armors')
@Controller('/api/armors')
export class ArmorsController {
  constructor(private readonly armorsService: ArmorsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new armor with an image',
    schema: createArmorShema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/armors',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createArmor(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateArmorDto,
  ) {
    const iconPath = file ? `/images/armors/${file.filename}` : null;

    const createArmorDto: CreateArmorDto = {
      ...body,
      weight:
        typeof body.weight === 'string' ? parseFloat(body.weight) : body.weight,
      type: typeof body.type === 'string' ? parseInt(body.type, 10) : body.type,
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      disadvantage:
        typeof body.disadvantage === 'string'
          ? body.disadvantage === 'true'
          : body.disadvantage,
      icon: iconPath,
    };

    return this.armorsService.create(createArmorDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing armor with an image',
    schema: updateArmorShema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/armors',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateArmor(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateArmorDto,
  ) {
    const iconPath = file ? `/images/armors/${file.filename}` : null;

    const updateArmorDto: UpdateArmorDto = {
      ...body,
      weight:
        typeof body.weight === 'string' ? parseFloat(body.weight) : body.weight,
      type: typeof body.type === 'string' ? parseInt(body.type, 10) : body.type,
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      disadvantage:
        typeof body.disadvantage === 'string'
          ? body.disadvantage === 'true'
          : body.disadvantage,
      icon: iconPath,
    };

    return this.armorsService.update(id, updateArmorDto);
  }

  @Get()
  @ApiOkResponse({ type: [GetArmorDto] })
  async findAll() {
    return this.armorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CreateArmorDto })
  async findOne(@Param('id') id: number) {
    return this.armorsService.findOne(id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteArmorDto })
  async remove(@Param('id') id: number) {
    return this.armorsService.remove(id);
  }
}
