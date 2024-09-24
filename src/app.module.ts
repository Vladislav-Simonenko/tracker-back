import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { HeroModule } from './heroes/heroes.module';
import { RaceModule } from './races/race.module';

@Module({
  imports: [AuthModule, UsersModule, HeroModule, RaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
