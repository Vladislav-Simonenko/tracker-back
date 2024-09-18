import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorldDto } from './dto/create-word.dto';
import { UpdateWorldDto } from './dto/update-world.dto';

@Injectable()
export class WorldsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorldDto: CreateWorldDto) {
    try {
      const world = await this.prisma.worlds.create({
        data: createWorldDto,
      });
      return this.transformBigInt(world);
    } catch (error) {
      throw new ConflictException('Error creating world: ' + error.message);
    }
  }

  async findAll() {
    try {
      const worlds = await this.prisma.worlds.findMany();
      return worlds.map(this.transformBigInt);
    } catch (error) {
      throw new ConflictException('Error retrieving worlds: ' + error.message);
    }
  }

  async findOne(id: string) {
    try {
      const world = await this.prisma.worlds.findUnique({
        where: { id: BigInt(id) },
      });
      if (!world) {
        throw new NotFoundException(`World with id ${id} not found`);
      }
      return this.transformBigInt(world);
    } catch (error) {
      throw new NotFoundException('Error retrieving world: ' + error.message);
    }
  }

  async update(id: string, updateWorldDto: UpdateWorldDto) {
    try {
      const world = await this.prisma.worlds.update({
        where: { id: BigInt(id) },
        data: updateWorldDto,
      });
      return this.transformBigInt(world);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`World with id ${id} not found`);
      }
      throw new ConflictException('Error updating world: ' + error.message);
    }
  }

  async remove(id: string) {
    try {
      const world = await this.prisma.worlds.delete({
        where: { id: BigInt(id) },
      });
      return this.transformBigInt(world);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`World with id ${id} not found`);
      }
      throw new ConflictException('Error deleting world: ' + error.message);
    }
  }

  private transformBigInt(entity: any) {
    return JSON.parse(
      JSON.stringify(entity, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
  }
}
