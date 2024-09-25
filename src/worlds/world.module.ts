import { Module } from '@nestjs/common';
import { WorldService } from './world.service';
import { WorldController } from './world.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorldController],
  providers: [WorldService, PrismaService],
})
export class WorldModule {}
