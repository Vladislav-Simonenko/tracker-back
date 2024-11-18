import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { createHeroSchema } from './schema/create-hero.schema';
import { updateHeroSchema } from './schema/update-hero.schema';
import { HeroService } from './heroes.service';
import { generateFileName } from 'src/utils/file-utils';
import { DeleteUserDto } from '@users/dto/delete-user.dto';
import { DeleteHeroDto } from './dto/delete-hero.dto';
import { GetHeroByIdDto } from './dto/get-hero-id.dto';

@ApiTags('heroes')
@Controller('/api/heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  getAllHeroes() {
    return this.heroService.getAllHeroes();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID героя',
    required: true,
    type: Number,
  })
  @ApiOkResponse({ type: GetHeroByIdDto })
  getHeroById(@Param('id') id: number) {
    return this.heroService.getHeroById(id);
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
        filename: generateFileName,
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
    description: 'Обновить героя с изображением',
    schema: updateHeroSchema,
  })
  @ApiParam({ name: 'id', description: 'ID героя', required: true })
  async updateHero(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateHeroDto,
  ) {
    const imageUrl = file ? `/images/heroes/${file.filename}` : null;

    const updateHeroDto: UpdateHeroDto = {
      ...body,
      image_url: imageUrl || body.image_url,
    };

    return this.heroService.updateHero(id, updateHeroDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteHeroDto })
  @ApiParam({ name: 'id', description: 'ID героя', required: true })
  deleteHero(@Param('id') id: number) {
    return this.heroService.deleteHero(id);
  }
}
