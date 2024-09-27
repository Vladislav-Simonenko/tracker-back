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
import { RuleModule } from './rules/rule.module';
import { ClassModule } from './classes/class.module';
import { MonsterModule } from './monsters/monster.module';
import { ArmorModule } from './armor/armor.module';
import { InvocationModule } from './eldritch_invocations/invocation.module';

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
    RuleModule,
    ClassModule,
    MonsterModule,
    ArmorModule,
    InvocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
