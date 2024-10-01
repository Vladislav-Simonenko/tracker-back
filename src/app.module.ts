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
import { MitemModule } from './magic-items/mitem.module';
import { ApsModule } from './auto-prepared-spells/aps.module';
import { WpModule } from './warlock_pacts/wp.module';
import { BmModule } from './battle-members/bm.module';
import { ClassSpellsModule } from './class-spells/cs.module';
import { SpellModule } from './spells/spell.module';
import { FsModule } from './fighting-styles/fs.module';
import { SsModule } from './subclass-spells/ss.module';
import { SubraceModule } from './subraces/subraces.module';
import { SubclassModule } from './subclasses/subclass.module';

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
    MitemModule,
    ApsModule,
    WpModule,
    BmModule,
    ClassSpellsModule,
    SpellModule,
    FsModule,
    SsModule,
    SubraceModule,
    SubclassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
