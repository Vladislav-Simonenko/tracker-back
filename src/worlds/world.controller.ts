import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WorldService } from './world.service';
import { CreateWorldDto } from './dto/create-world.dto';
import { UpdateWorldDto } from './dto/update-world.dto';

@ApiTags('worlds')
@Controller('worlds')
export class WorldController {
  constructor(private readonly worldsService: WorldService) {}

  @Get()
  getAllWorlds() {
    return this.worldsService.getAllWorlds();
  }

  @Get(':id')
  getWorldById(@Param('id') id: number) {
    return this.worldsService.getWorldById(id);
  }

  @Post()
  @ApiBody({ type: CreateWorldDto })
  createWorld(@Body() createWorldDto: CreateWorldDto) {
    return this.worldsService.createWorld(createWorldDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateWorldDto })
  updateWorld(@Param('id') id: number, @Body() updateWorldDto: UpdateWorldDto) {
    return this.worldsService.updateWorld(id, updateWorldDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'World successfully deleted' })
  deleteWorld(@Param('id') id: number) {
    return this.worldsService.deleteWorld(id);
  }
}
