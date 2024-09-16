import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
// import { MailerModule } from '@nestjs-modules/mailer'; // добавьте MailerModule
// import { MailerService } from '../mailer/mailer.service'; // добавьте MailerService
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    // NOTE
    // MailerModule.forRoot({
    // Настройте параметры MailerModule в зависимости от используемой почтовой службы
    // }),
  ],
  providers: [AuthService, PrismaService], //MailerService не забыть
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
