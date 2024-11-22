import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HeroController } from './heroes.controller';
import { HeroService } from './heroes.service';
import { HeroGateway } from './heroes.gateway';

@Module({
  controllers: [HeroController],
  providers: [HeroService, HeroGateway, PrismaService], // Добавляем HeroGateway
})
export class HeroModule {}
