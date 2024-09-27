import { Module } from '@nestjs/common';
import { BmService } from './bm.service';
import { BmController } from './bm.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BmController],
  providers: [BmService, PrismaService],
})
export class BmModule {}
