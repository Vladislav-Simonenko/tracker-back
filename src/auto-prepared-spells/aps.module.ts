import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApsController } from './aps.controller';
import { ApsService } from './aps.service';

@Module({
  controllers: [ApsController],
  providers: [ApsService, PrismaService],
})
export class ApsModule {}
