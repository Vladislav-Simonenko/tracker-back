import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
// import { MailerModule } from '@nestjs-modules/mailer'; // добавьте MailerModule
// import { MailerService } from '../mailer/mailer.service'; // добавьте MailerService
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    // MailerModule.forRoot({
    // Настройте параметры MailerModule в зависимости от используемой почтовой службы
    // }),
  ],
  providers: [AuthService, PrismaService], //MailerService не забыть
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}