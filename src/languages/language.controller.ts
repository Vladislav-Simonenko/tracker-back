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
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  async getAllLanguages() {
    return this.languageService.getAllLanguages();
  }

  @Get(':id')
  async getLanguageById(@Param('id') id: number) {
    return this.languageService.getLanguageById(id);
  }

  @Post()
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.createLanguage(createLanguageDto);
  }

  @Put(':id')
  async updateLanguage(
    @Param('id') id: number,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.updateLanguage(id, updateLanguageDto);
  }

  @Delete(':id')
  async deleteLanguage(@Param('id') id: number) {
    return this.languageService.deleteLanguage(id);
  }
}
