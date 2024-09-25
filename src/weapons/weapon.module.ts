import { Module } from '@nestjs/common';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  controllers: [WeaponController],
  providers: [WeaponService, PrismaService],
})
export class WeaponModule {}
