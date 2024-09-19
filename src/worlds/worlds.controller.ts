import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WorldsService } from './worlds.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateWorldDto } from './dto/create-word.dto';
import { GetWorldDto } from './dto/get-world.dto';
import { UpdateWorldDto } from './dto/update-world.dto';
import { DeleteWorldDto } from './dto/delete-world.dto';

@ApiTags('worlds')
@Controller('/api/worlds')
export class WorldsController {
  constructor(private readonly worldsService: WorldsService) {}

  @Post()
  @ApiOkResponse({ type: GetWorldDto })
  async create(@Body() createWorldDto: CreateWorldDto) {
    return this.worldsService.create(createWorldDto);
  }

  @Get()
  @ApiOkResponse({ type: [GetWorldDto] })
  async findAll() {
    return this.worldsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GetWorldDto })
  async findOne(@Param('id') id: string) {
    return this.worldsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorldDto: UpdateWorldDto,
  ) {
    return this.worldsService.update(id, updateWorldDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteWorldDto })
  async remove(@Param('id') id: string) {
    return this.worldsService.remove(id);
  }
}
