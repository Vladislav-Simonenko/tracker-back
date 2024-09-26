import { PrismaService } from '@prisma/prisma.service';
import { ArmorController } from './armor.controller';
import { ArmorService } from './armor.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ArmorController],
  providers: [ArmorService, PrismaService],
})
export class ArmorModule {}
