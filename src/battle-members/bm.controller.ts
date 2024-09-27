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
import { BmService } from './bm.service';
import { CreateBmDto } from './dto/create-bm.dto';
import { UpdateBmDto } from './dto/update-bm.dto';

@ApiTags('battle-members')
@Controller('/api/bm')
export class BmController {
  constructor(private readonly bmService: BmService) {}

  @Get()
  getAllBms() {
    return this.bmService.getAllBm();
  }

  @Get(':id')
  getBmById(@Param('id') id: number) {
    return this.bmService.getBmById(id);
  }

  @Post()
  @ApiBody({ type: CreateBmDto })
  createBm(@Body() createBmDto: CreateBmDto) {
    return this.bmService.createBm(createBmDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateBmDto })
  updateBm(@Param('id') id: number, @Body() updateBmDto: UpdateBmDto) {
    return this.bmService.updateBm(id, updateBmDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Bm successfully deleted' })
  deleteBm(@Param('id') id: number) {
    return this.bmService.deleteBm(id);
  }
}
