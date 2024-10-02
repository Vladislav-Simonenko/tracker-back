import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UpdateSsDto } from './dto/update-ss.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateSsDto } from './dto/cretate-ss.dto';
import { SsService } from './ss.service';

@ApiTags('subclass-spells')
@Controller('/api/subclass-spells')
export class SsController {
  constructor(private readonly ssService: SsService) {}

  @Get()
  async getAllSs() {
    return await this.ssService.getAllSs();
  }

  @Get(':subclass_id/:spell_id')
  async getSsById(
    @Param('subclass_id') subclass_id: number,
    @Param('spell_id') spell_id: string,
  ) {
    const ss = await this.ssService.getSsById(subclass_id, spell_id);
    if (!ss) {
      throw new NotFoundException(
        `Subclass spell with subclass_id ${subclass_id} and spell_id ${spell_id} not found`,
      );
    }
    return ss;
  }

  @Post()
  async createSs(@Body() createSsDto: CreateSsDto) {
    return await this.ssService.createSs(createSsDto);
  }

  @Put(':subclass_id/:spell_id')
  async updateSs(
    @Param('subclass_id') subclass_id: number,
    @Param('spell_id') spell_id: string,
    @Body() updateSsDto: UpdateSsDto,
  ) {
    return await this.ssService.updateSs(subclass_id, spell_id, updateSsDto);
  }

  @Delete(':subclass_id/:spell_id')
  async deleteSs(
    @Param('subclass_id') subclass_id: number,
    @Param('spell_id') spell_id: string,
  ) {
    return await this.ssService.deleteSs(subclass_id, spell_id);
  }
}
