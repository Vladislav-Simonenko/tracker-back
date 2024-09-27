import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvocationController } from './invocation.controller';
import { InvocationService } from './invocation.service';

@Module({
  controllers: [InvocationController],
  providers: [InvocationService, PrismaService],
})
export class InvocationModule {}
