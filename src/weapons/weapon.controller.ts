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
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { DeleteWeaponDto } from './dto/delete-weapon.dto';
import { WeaponsService } from './weapon.service';
import { GetWeaponDto } from './dto/get-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createWeaponSchema } from './shema/create-weapon.shema';
import { updateWeaponShema } from './shema/update-weapon.shema';

@ApiTags('weapons')
@Controller('/api/weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new weapon with an image',
    schema: createWeaponSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/weapons',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createWeapon(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateWeaponDto,
  ) {
    const iconPath = file ? `/images/weapons/${file.filename}` : null;

    const createWeaponDto: CreateWeaponDto = {
      ...body,
      type: typeof body.type === 'string' ? parseInt(body.type, 10) : body.type,
      properties: Array.isArray(body.properties)
        ? body.properties
        : [body.properties],
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      icon: iconPath,
    };

    return this.weaponsService.create(createWeaponDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing weapon with an image',
    schema: updateWeaponShema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/weapons',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateWeapon(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateWeaponDto,
  ) {
    const iconPath = file ? `/images/weapons/${file.filename}` : null;

    const updateWeaponDto: UpdateWeaponDto = {
      ...body,
      type: typeof body.type === 'string' ? parseInt(body.type, 10) : body.type,
      properties: Array.isArray(body.properties)
        ? body.properties
        : [body.properties],
      homebrew:
        typeof body.homebrew === 'string'
          ? body.homebrew === 'true'
          : body.homebrew,
      icon: iconPath,
    };

    return this.weaponsService.update(id, updateWeaponDto);
  }

  @Get()
  @ApiOkResponse({ type: [GetWeaponDto] })
  async findAll() {
    return this.weaponsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GetWeaponDto })
  async findOne(@Param('id') id: string) {
    return this.weaponsService.findOne(id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteWeaponDto })
  async remove(@Param('id') id: string) {
    return this.weaponsService.remove(id);
  }
}
