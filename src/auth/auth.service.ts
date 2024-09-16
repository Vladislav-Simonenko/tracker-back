import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
// import { MailerService } from 'src/mailer/mailer.service';
import * as bcryptjs from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    // private mailerService: MailerService,
  ) {}

  async register(
    email: string,
    password: string,
    login: string,
  ): Promise<{ message: string }> {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        login,
        role: 'USER',
        isVerified: true,
      },
    });

    // const verificationToken = await this.jwtService.signAsync(
    //   { sub: user.id, email: user.email },
    //   { expiresIn: '1h' },
    // );

    // NOTE: Отправляем verificationToken по email
    // await this.mailerService.sendVerificationEmail(user.email, verificationToken);

    return {
      message:
        'Registration successful. Please check your email to verify your account.',
    };
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const payload = this.jwtService.verify(token);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      if (user.isVerified) {
        return { message: 'Email already verified.' };
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });

      return { message: 'Email successfully verified.' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired verification token.');
    }
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (
      !user ||
      !(await bcryptjs.compare(password, user.password)) ||
      !user.isVerified
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ access_token: string }> {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newAccessToken = await this.jwtService.signAsync(
        { sub: user.id, email: user.email, role: user.role },
        { expiresIn: '15m' },
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }
  }

  async logout(userId: number): Promise<{ message: string }> {
    return { message: 'Logged out successfully' };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '1h' },
    );

    // NOTE: Здесь нужно создать токен и отправить ссылку для восстановления пароля на email,с использованием MailerService

    return { message: 'Password reset link has been sent to your email.' };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    try {
      const payload = this.jwtService.verify(token);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      const hashedPassword = await bcryptjs.hash(newPassword, 10);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return { message: 'Password has been reset successfully.' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired reset token.');
    }
  }
}
