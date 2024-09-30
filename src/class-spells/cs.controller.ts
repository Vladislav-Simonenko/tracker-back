import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClassSpellsService } from './cs.service';
import { CreateClassSpellDto } from './dto/create-cs.dto';
import { UpdateClassSpellDto } from './dto/update-cs.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('class-spells')
@Controller('/api/class-spells')
export class ClassSpellsController {
  constructor(private readonly classSpellsService: ClassSpellsService) {}

  @Post()
  create(@Body() createClassSpellDto: CreateClassSpellDto) {
    return this.classSpellsService.create(createClassSpellDto);
  }

  @Get()
  findAll() {
    return this.classSpellsService.findAll();
  }

  @Get(':class_id/:spell_id')
  findOne(
    @Param('class_id') class_id: number,
    @Param('spell_id') spell_id: string,
  ) {
    return this.classSpellsService.findOne(class_id, spell_id);
  }

  @Put(':class_id/:spell_id')
  update(
    @Param('class_id') class_id: number,
    @Param('spell_id') spell_id: string,
    @Body() updateClassSpellDto: UpdateClassSpellDto,
  ) {
    return this.classSpellsService.update(
      class_id,
      spell_id,
      updateClassSpellDto,
    );
  }

  @Delete(':class_id/:spell_id')
  remove(
    @Param('class_id') class_id: number,
    @Param('spell_id') spell_id: string,
  ) {
    return this.classSpellsService.remove(class_id, spell_id);
  }
}
