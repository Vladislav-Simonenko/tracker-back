import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Injectable()
export class RaceService {
  constructor(private prisma: PrismaService) {}

  async getAllRaces() {
    return this.prisma.races.findMany();
  }

  async getRaceById(id: number) {
    const race = await this.prisma.races.findUnique({
      where: { id },
    });
    if (!race) {
      throw new NotFoundException(`Race with ID ${id} not found`);
    }
    return race;
  }

  async createRace(createRaceDto: CreateRaceDto) {
    return this.prisma.races.create({
      data: createRaceDto,
    });
  }

  async updateRace(id: number, updateRaceDto: UpdateRaceDto) {
    const race = await this.prisma.races.update({
      where: { id: Number(id) },
      data: updateRaceDto,
    });
    if (!race) {
      throw new NotFoundException(`Race with ID ${id} not found`);
    }
    return race;
  }

  async deleteRace(id: number) {
    await this.prisma.races.delete({
      where: { id },
    });
    return { message: `Race with ID ${id} deleted` };
  }
}
