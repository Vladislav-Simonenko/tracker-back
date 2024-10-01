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
import { ArmorService } from './armor.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { createArmorSchema } from './schema/create-armor.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFileName } from 'src/utils/file-utils';
import { CreateArmorDto } from './dto/create-armor.dto';
import { updateArmorSchema } from './schema/update-armor.schema';
import { UpdateArmorDto } from './dto/update-armor.dto';

@ApiTags('armors')
@Controller('/api/armors')
export class ArmorController {
  constructor(private readonly armorService: ArmorService) {}

  @Get()
  async getAllArmor() {
    return this.armorService.getAllArmors();
  }

  @Get(':id')
  async getArmorById(@Param('id') id: number) {
    return this.armorService.getArmorById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new armor with an image',
    schema: createArmorSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/armors',
        filename: generateFileName,
      }),
    }),
  )
  async createArmor(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateArmorDto,
  ) {
    const iconPath = file ? `/images/armors/${file.filename}` : '';

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

    return this.armorService.createArmor(createArmorDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing armor with an image',
    schema: updateArmorSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/armors',
        filename: generateFileName,
      }),
    }),
  )
  async updateArmor(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateArmorDto,
  ) {
    const iconPath = file ? `/images/armors/${file.filename}` : '';

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

    return this.armorService.updateArmor(id, updateArmorDto);
  }

  @Delete(':id')
  async deleteArmor(@Param('id') id: number) {
    return await this.armorService.deleteArmor(id);
  }
}
