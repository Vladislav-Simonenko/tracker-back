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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFileName } from 'src/utils/file-utils';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';
import { SpellService } from './spell.service';
import { createSpellSchema } from './schema/create-schema.dto';
import { updateSpellSchema } from './schema/update-schema.dto';

@ApiTags('spells')
@Controller('/api/spells')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Get()
  async getAllSpell() {
    return this.spellService.getAllSpells();
  }

  @Get(':id')
  async getSpellById(@Param('id') id: string) {
    return this.spellService.getSpellById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new spell with an image',
    schema: createSpellSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/spells',
        filename: generateFileName,
      }),
    }),
  )
  async createSpell(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateSpellDto,
  ) {
    const iconPath = file ? `/images/weapons/${file.filename}` : '';

    const createSpellDto: CreateSpellDto = {
      ...body,
      level: Number(body.level),
      component_v:
        typeof body.component_v === 'string'
          ? body.component_v === 'true'
          : body.component_v,
      ritual:
        typeof body.ritual === 'string' ? body.ritual === 'true' : body.ritual,
      component_s:
        typeof body.component_s === 'string'
          ? body.component_s === 'true'
          : body.component_s,
      icon: iconPath,
    };

    return this.spellService.createSpell(createSpellDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing spell with an image',
    schema: updateSpellSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/spells',
        filename: generateFileName,
      }),
    }),
  )
  async updateSpell(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateSpellDto,
  ) {
    const iconPath = file ? `/images/spells/${file.filename}` : '';

    const updateSpellDto: UpdateSpellDto = {
      ...body,
      level: Number(body.level),
      component_v:
        typeof body.component_v === 'string'
          ? body.component_v === 'true'
          : body.component_v,
      ritual:
        typeof body.ritual === 'string' ? body.ritual === 'true' : body.ritual,
      component_s:
        typeof body.component_s === 'string'
          ? body.component_s === 'true'
          : body.component_s,
      icon: iconPath,
    };

    return this.spellService.updateSpell(id, updateSpellDto);
  }

  @Delete(':id')
  async deleteSpell(@Param('id') id: string) {
    return await this.spellService.deleteSpell(id);
  }
}
