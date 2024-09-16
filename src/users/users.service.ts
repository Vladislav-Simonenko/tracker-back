import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import { UserRole } from './dto/user-role.dto';
import { AuthService } from '@auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        isVerified: true,
      },
    });
    const loginDto = {
      email: user.email,
      password: createUserDto.password,
    };
    return {
      message:
        'Registration successful. Please check your email to verify your account.',
    };
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      return { message: 'the user could not be deleted.' };
    }
  }

  async updateUserRole(id: number, role: UserRole) {
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}
