import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { RaceService } from './race.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFileName } from 'src/utils/file-utils';

@ApiTags('races')
@Controller('/api/races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get()
  getAllRaces() {
    return this.raceService.getAllRaces();
  }

  @Get(':id')
  getRaceById(@Param('id') id: string) {
    return this.raceService.getRaceById(+id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new race with an image',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: { type: 'string' },
        description: { type: 'string' },
        speed: { type: 'number' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/races',
        filename: generateFileName,
      }),
    }),
  )
  async createrace(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateRaceDto,
  ) {
    const imageUrl = file ? `/images/races/${file.filename}` : null;

    const createraceDto: CreateRaceDto = {
      ...body,
      speed: Number(body.speed),
      icon: imageUrl,
    };

    return this.raceService.createRace(createraceDto);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create race with an image',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: { type: 'string' },
        description: { type: 'string' },
        speed: { type: 'number' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images/races',
        filename: generateFileName,
      }),
    }),
  )
  async updateRace(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateRaceDto,
  ) {
    const imageUrl = file ? `/images/races/${file.filename}` : null;

    const createRaceDto: UpdateRaceDto = {
      ...body,
      speed: Number(body.speed),
      icon: imageUrl || body.icon,
    };

    return this.raceService.updateRace(id, createRaceDto);
  }

  @Delete(':id')
  deleteRace(@Param('id') id: string) {
    return this.raceService.deleteRace(+id);
  }
}
