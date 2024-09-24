import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { ApiTags, ApiOkResponse, ApiBody } from '@nestjs/swagger';
import { FeatureService } from './feature.service';

@ApiTags('features')
@Controller('features')
export class FeatureController {
  constructor(private readonly featuresService: FeatureService) {}

  @Get()
  getAllFeatures() {
    return this.featuresService.getAllFeatures();
  }

  @Get(':id')
  getFeatureById(@Param('id') id: string) {
    return this.featuresService.getFeatureById(id);
  }

  @Post()
  @ApiBody({ type: CreateFeatureDto })
  createFeature(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featuresService.createFeature(createFeatureDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateFeatureDto })
  updateFeature(
    @Param('id') id: string,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ) {
    return this.featuresService.updateFeature(id, updateFeatureDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Feature successfully deleted' })
  deleteFeature(@Param('id') id: string) {
    return this.featuresService.deleteFeature(id);
  }
}
