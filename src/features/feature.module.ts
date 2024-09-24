import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
  controllers: [FeatureController],
  providers: [FeatureService, PrismaService],
})
export class FeatureModule {}
