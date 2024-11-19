import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HeroController } from './heroes.controller';
import { HeroService } from './heroes.service';
import { HeroesGateway } from './heroes.gateway';

@Module({
  controllers: [HeroController],
  providers: [HeroService, PrismaService, HeroesGateway],
})
export class HeroModule {}
