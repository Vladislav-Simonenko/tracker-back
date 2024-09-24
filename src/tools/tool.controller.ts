import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tools')
@Controller('tools')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get()
  async getAllTools() {
    return this.toolService.getAllTools();
  }

  @Get(':id')
  async getToolById(@Param('id') id: number) {
    return this.toolService.getToolById(id);
  }

  @Post()
  async createTool(@Body() createToolDto: CreateToolDto) {
    return this.toolService.createTool(createToolDto);
  }

  @Put(':id')
  async updateTool(
    @Param('id') id: number,
    @Body() updateToolDto: UpdateToolDto,
  ) {
    return this.toolService.updateTool(id, updateToolDto);
  }

  @Delete(':id')
  async deleteTool(@Param('id') id: number) {
    return this.toolService.deleteTool(id);
  }
}
