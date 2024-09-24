import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TraitService } from './trait.service';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';
import { ApiTags, ApiOkResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('traits')
@Controller('traits')
export class TraitController {
  constructor(private readonly traitsService: TraitService) {}

  @Get()
  getAllTraits() {
    return this.traitsService.getAllTraits();
  }

  @Get(':id')
  getTraitById(@Param('id') id: string) {
    return this.traitsService.getTraitById(id);
  }

  @Post()
  @ApiBody({ type: CreateTraitDto })
  createTrait(@Body() createTraitDto: CreateTraitDto) {
    return this.traitsService.createTrait(createTraitDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateTraitDto })
  updateTrait(@Param('id') id: string, @Body() updateTraitDto: UpdateTraitDto) {
    return this.traitsService.updateTrait(id, updateTraitDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Trait successfully deleted' })
  deleteTrait(@Param('id') id: string) {
    return this.traitsService.deleteTrait(id);
  }
}
