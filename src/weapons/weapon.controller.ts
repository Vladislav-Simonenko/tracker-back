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
import { WeaponService } from './weapon.service';
import { generateFileName } from 'src/utils/file-utils';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWeaponSchema } from './schema/create-weapon.schema';
import { updateWeaponSchema } from './schema/update-weapon.schema';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

@ApiTags('weapons')
@Controller('/api/weapons')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Get()
  async getAllWeapons() {
    return this.weaponService.getAllWeapons();
  }

  @Get(':id')
  async getWeaponByID(@Param('id') id: string) {
    return this.weaponService.getWeaponById(id);
  }

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
        filename: generateFileName,
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

    return this.weaponService.createWeapon(createWeaponDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing weapon with an image',
    schema: updateWeaponSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/weapons',
        filename: generateFileName,
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

    return this.weaponService.updateWeapon(id, updateWeaponDto);
  }
  @Delete(':id')
  async deleteWeapon(@Param('id') id: string) {
    return await this.weaponService.deleteWeapon(id);
  }
}
