import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HeroController } from './heroes.controller';
import { HeroService } from './heroes.service';

@Module({
  controllers: [HeroController],
  providers: [HeroService, PrismaService],
})
export class HeroModule {}
