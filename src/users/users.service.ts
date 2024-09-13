import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        verificationToken,
        isVerified: createUserDto.isVerified ?? true,
      },
    });
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
      return null;
    }
  }

  async updateUserRole(id: number, role: 'USER' | 'ADMIN' | 'MASTER') {
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}
