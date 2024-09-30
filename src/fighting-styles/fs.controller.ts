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
import { FsService } from './fs.service';
import { UpdateFsDto } from './dto/update-fs.dto';
import { CreateFsDto } from './dto/create-fs.dto';

@ApiTags('fighting-styles')
@Controller('/api/fs')
export class FsController {
  constructor(private readonly fsService: FsService) {}

  @Get()
  getAllFs() {
    return this.fsService.getAllFs();
  }

  @Get(':id')
  getFsById(@Param('id') id: number) {
    return this.fsService.getFsById(id);
  }

  @Post()
  @ApiBody({ type: CreateFsDto })
  createFs(@Body() createFsDto: CreateFsDto) {
    return this.fsService.createFs(createFsDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateFsDto })
  updateFs(@Param('id') id: number, @Body() updateFsDto: UpdateFsDto) {
    return this.fsService.updateFs(id, updateFsDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Fighting style successfully deleted' })
  deleteFs(@Param('id') id: number) {
    return this.fsService.deleteFs(id);
  }
}
