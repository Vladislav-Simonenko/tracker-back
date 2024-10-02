import { Module } from '@nestjs/common';
import { TsController } from './ts.controller';
import { TsService } from './ts.service';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  controllers: [TsController],
  providers: [TsService, PrismaService],
})
export class TsModule {}
