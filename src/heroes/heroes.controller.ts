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
  ValidationPipe,
  UsePipes,
  BadRequestException,
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
import { DeleteHeroDto } from './dto/delete-hero.dto';
import { GetHeroByIdDto } from './dto/get-hero-id.dto';
import { GetDamageDto } from './dto/get-damage.dto';
import {
  AddBuffHpDto,
  AddTempHpDto,
  GetHealingDto,
} from './dto/get-healing.dto';

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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/heroes',
        filename: generateFileName,
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateHero(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateHeroDto,
  ) {
    console.log('Received Body:', body);
    console.log(
      'Image URL:',
      file ? `/images/heroes/${file.filename}` : 'No file uploaded',
    );

    const imageUrl = file ? `/images/heroes/${file.filename}` : body.image_url;

    const updateHeroDto: UpdateHeroDto = {
      ...body,
      image_url: imageUrl,
    };

    console.log('Full Request:', { body, file });
    return this.heroService.updateHero(id, updateHeroDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteHeroDto })
  @ApiParam({ name: 'id', description: 'ID героя', required: true })
  deleteHero(@Param('id') id: number) {
    return this.heroService.deleteHero(id);
  }

  @Put(':id/damage')
  @ApiParam({ name: 'id', description: 'ID героя', required: true })
  @ApiBody({
    description: 'Применить урон к герою',
    type: GetDamageDto,
  })
  async applyDamage(@Param('id') id: number, @Body() body: GetDamageDto) {
    const { damage } = body;

    if (isNaN(damage)) {
      throw new BadRequestException('Damage must be a valid number');
    }

    return this.heroService.applyDamage(id, damage);
  }

  @Put(':id/heal')
  @ApiParam({ name: 'id', description: 'ID героя', required: true })
  @ApiBody({
    description: 'Применить лечение к герою',
    type: GetHealingDto,
  })
  async applyHealing(@Param('id') id: number, @Body() body: GetHealingDto) {
    const { healing } = body;

    if (isNaN(healing)) {
      throw new BadRequestException('Healing must be a valid number');
    }

    return this.heroService.applyHealing(id, healing);
  }

  @Put(':id/temp-hp')
  @ApiParam({ name: 'id', description: 'ID героя', required: true })
  @ApiBody({
    description: 'Добавить временные хп герою',
    type: AddTempHpDto,
  })
  async addTempHp(@Param('id') id: number, @Body() body: AddTempHpDto) {
    const { tempHp } = body;

    if (isNaN(tempHp)) {
      throw new BadRequestException('Temp HP must be a valid number');
    }

    return this.heroService.addTempHp(id, tempHp);
  }

  @Put(':id/buff-hp')
  @ApiParam({ name: 'id', description: 'ID героя', required: true })
  @ApiBody({
    description: 'Добавить баффированные хп герою',
    type: AddBuffHpDto,
  })
  async addBuffHp(@Param('id') id: number, @Body() body: AddBuffHpDto) {
    const { buffHp } = body;

    if (isNaN(buffHp)) {
      throw new BadRequestException('Buff HP must be a valid number');
    }

    return this.heroService.addBuffHp(id, buffHp);
  }
}
