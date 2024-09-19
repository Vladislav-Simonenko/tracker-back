import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WeaponsController } from './weapon.controller';
import { WeaponsService } from './weapon.service';

@Module({
  controllers: [WeaponsController],
  providers: [WeaponsService, PrismaService],
})
export class WeaponsModule {}
