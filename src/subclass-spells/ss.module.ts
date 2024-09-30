import { Module } from '@nestjs/common';
import { SsService } from './ss.service';
import { SsController } from './ss.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SsController],
  providers: [SsService, PrismaService],
})
export class SsModule {}
