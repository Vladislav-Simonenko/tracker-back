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
import { WpService } from './wp.service';
import { CreateWpDto } from './dto/create-wp.dto';
import { UpdateWpDto } from './dto/update-wp.dto';

@ApiTags('warlock-pacts')
@Controller('/api/wp')
export class WpController {
  constructor(private readonly wpService: WpService) {}

  @Get()
  getAllWp() {
    return this.wpService.getAllWp();
  }

  @Get(':id')
  getWpById(@Param('id') id: number) {
    return this.wpService.getWpById(id);
  }

  @Post()
  @ApiBody({ type: CreateWpDto })
  createWorld(@Body() createWpDto: CreateWpDto) {
    return this.wpService.createWp(createWpDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateWpDto })
  updateWorld(@Param('id') id: number, @Body() updateWpDto: UpdateWpDto) {
    return this.wpService.updateWp(id, updateWpDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'warlock pacts successfully deleted' })
  deleteWorld(@Param('id') id: number) {
    return this.wpService.deleteWp(id);
  }
}
