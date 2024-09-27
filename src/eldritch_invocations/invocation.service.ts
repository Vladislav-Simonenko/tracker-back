import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateInvocationDto } from './dto/create-invocation.dto';
import { UpdateInvocationDto } from './dto/update-invocation.dto';

@Injectable()
export class InvocationService {
  constructor(private prisma: PrismaService) {}

  async getAllInvocation() {
    return await this.prisma.eldritch_invocations.findMany();
  }

  async getInvocationById(id: string) {
    return await this.prisma.eldritch_invocations.findUnique({
      where: { id },
    });
  }

  async createInvocation(createInvocationDto: CreateInvocationDto) {
    return await this.prisma.eldritch_invocations.create({
      data: createInvocationDto,
    });
  }

  async updateInvocation(updateInvocationDto: UpdateInvocationDto, id: string) {
    return await this.prisma.eldritch_invocations.update({
      where: { id },
      data: updateInvocationDto,
    });
  }

  async deleteInvocation(id: string) {
    const invocatioon = await this.prisma.eldritch_invocations.delete({
      where: { id },
    });
    return { message: `Eldritch invocations with ID ${id} deleted` };
  }
}
