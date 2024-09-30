import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FsController } from './fs.controller';
import { FsService } from './fs.service';

@Module({
  controllers: [FsController],
  providers: [FsService, PrismaService],
})
export class FsModule {}
