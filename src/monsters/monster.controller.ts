import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { MonsterService } from './monster.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('monsters')
@Controller('/api/monsters')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Post()
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monsterService.createMonster(createMonsterDto);
  }

  @Get()
  findAll() {
    return this.monsterService.getAllMonsters();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.monsterService.getMonsterById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monsterService.updateMonster(id, updateMonsterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.monsterService.deleteMonster(id);
  }
}
