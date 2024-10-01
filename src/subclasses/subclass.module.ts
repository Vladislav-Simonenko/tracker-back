import { Module } from '@nestjs/common';
import { SubclassController } from './subclass.controller';
import { SubclassService } from './subclass.service';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  controllers: [SubclassController],
  providers: [SubclassService, PrismaService],
})
export class SubclassModule {}
