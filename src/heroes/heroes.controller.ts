import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './heroes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createHeroSchema } from './shema/create-hero.shema';
import { updateHeroSchema } from './shema/update-hero.shema';

@ApiTags('heroes')
@Controller('heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  getAllHeroes() {
    return this.heroService.getAllHeroes();
  }

  @Get(':id')
  getHeroById(@Param('id') id: string) {
    return this.heroService.getHeroById(Number(id));
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new hero with an image',
    schema: createHeroSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/heroes',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createHero(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateHeroDto,
  ) {
    const imageUrl = file ? `/images/heroes/${file.filename}` : null;

    const createHeroDto: CreateHeroDto = {
      ...body,
      image_url: imageUrl,
    };

    return this.heroService.createHero(createHeroDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create hero with an image',
    schema: updateHeroSchema,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/heroes',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateHero(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateHeroDto,
  ) {
    const imageUrl = file ? `/images/heroes/${file.filename}` : null;

    const createHeroDto: UpdateHeroDto = {
      ...body,
      image_url: imageUrl,
    };

    return this.heroService.updateHero(id, createHeroDto);
  }

  @Delete(':id')
  deleteHero(@Param('id') id: string) {
    return this.heroService.deleteHero(Number(id));
  }
}
