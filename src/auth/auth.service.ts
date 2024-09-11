import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
// import { MailerService } from 'src/mailer/mailer.service';
import * as bcrypt from 'bcryptjs';

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        login,
        role: 'USER',
        verificationToken: uuidv4(),
      },
    });

    // появится в более поздних версиях
    // await this.mailerService.sendVerificationEmail(
    //   user.email,

    //   user?.verificationToken,
    // );

    return {
      message:
        'Registration successful. Please check your email to verify your account.',
    };
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid verification token.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: '' },
    });

    return { message: 'Email successfully verified.' };
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { login: username },
    });

    if (
      !user ||
      !(await bcrypt.compare(pass, user.password)) ||
      !user.isVerified
    ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.login, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
