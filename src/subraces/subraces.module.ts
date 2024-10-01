import { PrismaService } from '@prisma/prisma.service';
import { Module } from '@nestjs/common';
import { SubraceController } from './subraces.controller';
import { SubraceService } from './subraces.service';

@Module({
  controllers: [SubraceController],
  providers: [SubraceService, PrismaService],
})
export class SubraceModule {}
