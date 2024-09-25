import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { HeroModule } from './heroes/heroes.module';
import { RaceModule } from './races/race.module';
import { TraitModule } from './traits/trait.module';
import { FeatureModule } from './features/feature.module';
import { LanguageModule } from './languages/language.model';
import { ToolModule } from './tools/tool.module';
import { ItemModule } from './items/item.module';
import { WorldModule } from './worlds/world.module';
import { WeaponModule } from './weapons/weapon.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    HeroModule,
    RaceModule,
    TraitModule,
    FeatureModule,
    LanguageModule,
    ToolModule,
    ItemModule,
    WorldModule,
    WeaponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
