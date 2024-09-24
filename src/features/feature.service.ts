import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { bigintToJSON } from 'src/utils/bigint-transformer';

@Injectable()
export class FeatureService {
  constructor(private prisma: PrismaService) {}

  async getAllFeatures() {
    const features = await this.prisma.features.findMany();
    return bigintToJSON(features);
  }

  async getFeatureById(id: string) {
    const feature = await this.prisma.features.findUnique({
      where: { id },
    });
    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }
    return bigintToJSON(feature);
  }

  async createFeature(createFeatureDto: CreateFeatureDto) {
    const newFeature = await this.prisma.features.create({
      data: createFeatureDto,
    });
    return bigintToJSON(newFeature);
  }

  async updateFeature(id: string, updateFeatureDto: UpdateFeatureDto) {
    const updatedFeature = await this.prisma.features.update({
      where: { id },
      data: updateFeatureDto,
    });
    return bigintToJSON(updatedFeature);
  }

  async deleteFeature(id: string) {
    const deletedFeature = await this.prisma.features.delete({
      where: { id },
    });
    return bigintToJSON({
      message: `Feature with ID ${id} deleted`,
      deletedFeature,
    });
  }
}
