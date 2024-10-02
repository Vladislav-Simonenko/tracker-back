import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TsService } from './ts.service';
import { CreateTsDto } from './dto/create-ts.dto';

@ApiTags('trait-spells')
@Controller('/api/trait-spells')
export class TsController {
  constructor(private readonly tsService: TsService) {}

  @Get()
  async getAllTs() {
    return await this.tsService.getAllTs();
  }

  @Get(':trait_id/:spell_id')
  async getTsById(
    @Param('trait_id') trait_id: string,
    @Param('spell_id') spell_id: string,
  ) {
    const ts = await this.tsService.getTsById(trait_id, spell_id);
    if (!ts) {
      throw new NotFoundException(
        `Trait spell with trait_id ${trait_id} and spell_id ${spell_id} not found`,
      );
    }
    return ts;
  }

  @Post()
  async createTs(@Body() createTsDto: CreateTsDto) {
    return this.tsService.createTs(createTsDto);
  }

  @Put(':trait_id/:spell_id')
  async updateTs(
    @Param('trait_id') trait_id: string,
    @Param('spell_id') spell_id: string,
  ) {
    return await this.tsService.DeleteTs(trait_id, spell_id);
  }
}
