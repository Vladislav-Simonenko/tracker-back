import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SsController } from './ss.controller';
import { SsService } from './ss.service';

@Module({
  controllers: [SsController],
  providers: [SsService, PrismaService],
})
export class SsModule {}
