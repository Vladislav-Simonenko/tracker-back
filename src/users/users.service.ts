import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import { UserRole } from './dto/user-role.enum';
import { AuthService } from '@auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Проверка на уникальность email и логина
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: createUserDto.email }, { login: createUserDto.login }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email или логин уже заняты.');
    }

    // Хеширование пароля
    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          isVerified: true,
        },
      });

      return {
        message:
          'Регистрация успешна. Пожалуйста, проверьте вашу почту для верификации аккаунта.',
      };
    } catch (error) {
      throw new BadRequestException('Ошибка при создании пользователя.');
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullname: true,
        login: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullname: true,
        login: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException(`Пользователь с id ${id} не найден.`);
    }

    // Проверка на уникальность email и логина
    if (updateUserDto.email || updateUserDto.login) {
      const userWithSameCredentials = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: updateUserDto.email ?? existingUser.email },
            { login: updateUserDto.login ?? existingUser.login },
          ],
          NOT: { id },
        },
      });

      if (userWithSameCredentials) {
        throw new ConflictException('Email или логин уже заняты.');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 10);
    }

    try {
      return this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new BadRequestException('Ошибка при обновлении пользователя.');
    }
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });

      return deletedUser;
    } catch (error) {
      throw new NotFoundException(
        `Пользователь с id ${id} не найден или уже удален.`,
      );
    }
  }

  async updateUserRole(id: string, role: UserRole) {
    if (!Object.values(UserRole).includes(role)) {
      throw new BadRequestException(
        `Недопустимая роль. Допустимые роли: ${Object.values(UserRole).join(', ')}`,
      );
    }

    try {
      return this.prisma.user.update({
        where: { id },
        data: { role },
      });
    } catch (error) {
      throw new NotFoundException(`Пользователь с id ${id} не найден.`);
    }
  }
}
