import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@auth/auth.guard';
import { AuthService } from '@auth/auth.service';
import { User } from '@prisma/client';
import {
  RegisterUserDto,
  LoginUserDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  RefreshTokenDto,
} from './dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return this.authService.register(body.email, body.password, body.login);
  }

  @ApiOperation({ summary: 'Отправка письма на указанный email' }) // Описание действия
  @ApiResponse({
    status: 200,
    description: 'Сообщение отправлено успешно',
    schema: {
      example: { message: 'Сообщение отправлено успешно' }, // Пример успешного ответа
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка при отправке сообщения',
    schema: {
      example: { message: 'Ошибка при отправке сообщения' }, // Пример ошибки
    },
  })
  @Post('send-email')
  async sendEmail(
    @Body() body: SendEmailDto, // Используем DTO
  ) {
    const { to, subject, message } = body;
    return this.authService.sendEmail(to, subject, message);
  }
  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
  }
  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Request() req: Request & { user: User }) {
    return this.authService.logout(req.user.id);
  }
}
