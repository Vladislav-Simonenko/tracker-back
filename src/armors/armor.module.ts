import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArmorsController } from './armor.controller';
import { ArmorsService } from './armor.service';

@Module({
  controllers: [ArmorsController],
  providers: [ArmorsService, PrismaService],
})
export class ArmorsModule {}
