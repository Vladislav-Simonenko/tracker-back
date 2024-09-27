import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MitemController } from './mitem.controller';
import { MitemService } from './mitem.service';

@Module({
  controllers: [MitemController],
  providers: [MitemService, PrismaService],
})
export class MitemModule {}
