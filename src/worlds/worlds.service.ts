import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorldDto } from './dto/create-word.dto';
import { UpdateWorldDto } from './dto/update-world.dto';

@Injectable()
export class WorldsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorldDto: CreateWorldDto) {
    const world = await this.prisma.worlds.create({
      data: createWorldDto,
    });
    return this.transformBigInt(world);
  }

  async findAll() {
    const worlds = await this.prisma.worlds.findMany();
    return worlds.map(this.transformBigInt);
  }

  async findOne(id: string) {
    const world = await this.prisma.worlds.findUnique({
      where: { id: BigInt(id) },
    });
    return this.transformBigInt(world);
  }

  async update(id: string, updateWorldDto: UpdateWorldDto) {
    const world = await this.prisma.worlds.update({
      where: { id: BigInt(id) },
      data: updateWorldDto,
    });
    return this.transformBigInt(world);
  }

  async remove(id: string) {
    const world = await this.prisma.worlds.delete({
      where: { id: BigInt(id) },
    });
    return this.transformBigInt(world);
  }

  private transformBigInt(entity: any) {
    return JSON.parse(
      JSON.stringify(entity, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
  }
}
