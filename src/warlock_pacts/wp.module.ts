import { Module } from '@nestjs/common';
import { WpService } from './wp.service';
import { WpController } from './wp.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WpController],
  providers: [WpService, PrismaService],
})
export class WpModule {}
