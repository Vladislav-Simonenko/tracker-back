import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { HeroModule } from './heroes/heroes.module';
import { RaceModule } from './races/race.module';
import { TraitModule } from './traits/trait.module';
import { FeatureModule } from './features/feature.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    HeroModule,
    RaceModule,
    TraitModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
