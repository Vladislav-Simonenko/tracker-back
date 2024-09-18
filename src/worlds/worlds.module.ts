import { Module } from '@nestjs/common';
import { WorldsService } from './worlds.service';
import { WorldsController } from './worlds.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorldsController],
  providers: [WorldsService, PrismaService],
})
export class WorldsModule {}
