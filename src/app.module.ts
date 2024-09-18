import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { ItemModule } from './items/item.module';
import { UploadModule } from './upload/upload.module';
import { HeroModule } from './heroes/heroes.module';
@Module({
  imports: [AuthModule, UsersModule, ItemModule, UploadModule, HeroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
