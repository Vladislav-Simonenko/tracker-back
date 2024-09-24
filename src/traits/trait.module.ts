import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TraitController } from './trait.controller';
import { TraitService } from './trait.service';

@Module({
  controllers: [TraitController],
  providers: [TraitService, PrismaService],
})
export class TraitModule {}
