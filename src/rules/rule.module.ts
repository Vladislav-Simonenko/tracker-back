import { Module } from '@nestjs/common';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  controllers: [RuleController],
  providers: [RuleService, PrismaService],
})
export class RuleModule {}
