import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { bigintToJSON } from 'src/utils/bigint-transformer';
import { CreateFsDto } from './dto/create-fs.dto';
import { UpdateFsDto } from './dto/update-fs.dto';

@Injectable()
export class FsService {
  constructor(private prisma: PrismaService) {}

  async getAllFs() {
    const fs = await this.prisma.fighting_styles.findMany();
    if (!fs || fs.length === 0) {
      throw new NotFoundException('No fighting styles found');
    }
    return bigintToJSON(fs);
  }

  async getFsById(id: number) {
    const fs = await this.prisma.fighting_styles.findUnique({
      where: { id },
    });
    if (!fs) {
      throw new NotFoundException(`Fighting style with ID ${id} not found`);
    }
    return bigintToJSON(fs);
  }

  async createFs(createFsDto: CreateFsDto) {
    const fs = await this.prisma.fighting_styles.create({
      data: createFsDto,
    });
    return bigintToJSON(fs);
  }

  async updateFs(id: number, updateFsDto: UpdateFsDto) {
    const fs = await this.prisma.fighting_styles.update({
      where: { id },
      data: updateFsDto,
    });
    return bigintToJSON(fs);
  }

  async deleteFs(id: number) {
    const fs = await this.prisma.fighting_styles.delete({
      where: { id },
    });
    return bigintToJSON({
      message: `fighting styles with ID ${id} deleted`,
    });
  }
}
