import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ClassSpellsController } from './cs.controller';
import { ClassSpellsService } from './cs.service';

@Module({
  controllers: [ClassSpellsController],
  providers: [ClassSpellsService, PrismaService],
})
export class ClassSpellsModule {}
