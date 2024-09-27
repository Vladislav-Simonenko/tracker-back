import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApsService } from './aps.service';
import { CreateApsDto } from './dto/create-aps.dto';
import { UpdateApsDto } from './dto/update-aps.dto';

@ApiTags('auto-prepared-spells')
@Controller('/api/aps')
export class ApsController {
  constructor(private readonly apsService: ApsService) {}

  @Get()
  getAllAps() {
    return this.apsService.getAllAps();
  }

  @Get(':id')
  getApsById(@Param('id') id: number) {
    return this.apsService.getApsById(id);
  }

  @Post()
  createAps(@Body() createApsDto: CreateApsDto) {
    return this.apsService.createAps(createApsDto);
  }

  @Put(':id')
  updateAps(@Param('id') id: number, @Body() updateApsDto: UpdateApsDto) {
    return this.apsService.updateAps(id, updateApsDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'auto prepared spells successfully deleted' })
  deleteWorld(@Param('id') id: number) {
    return this.apsService.deleteAps(id);
  }
}
