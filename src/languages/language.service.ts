import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}

  async getAllLanguages() {
    const languages = await this.prisma.languages.findMany();
    return languages;
  }

  async getLanguageById(id: number) {
    const language = await this.prisma.languages.findUnique({
      where: { id: Number(id) },
    });
    if (!language) {
      throw new NotFoundException(`Language with ID ${id} not found`);
    }
    return language;
  }

  async createLanguage(createLanguageDto: CreateLanguageDto) {
    const newLanguage = await this.prisma.languages.create({
      data: createLanguageDto,
    });
    return newLanguage;
  }

  async updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto) {
    const updatedLanguage = await this.prisma.languages.update({
      where: { id: Number(id) },
      data: updateLanguageDto,
    });
    return updatedLanguage;
  }

  async deleteLanguage(id: number) {
    const deletedLanguage = await this.prisma.languages.delete({
      where: { id: Number(id) },
    });
    return {
      message: `Language with ID ${id} deleted`,
      deletedLanguage,
    };
  }
}
