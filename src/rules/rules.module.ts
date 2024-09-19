import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';

@Module({
  controllers: [RulesController],
  providers: [RulesService, PrismaService],
})
export class RulesModule {}
