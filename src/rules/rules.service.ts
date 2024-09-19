import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class RulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRuleDto: CreateRuleDto) {
    const rule = await this.prisma.rules.create({
      data: createRuleDto,
    });
    return rule;
  }

  async findAll() {
    return this.prisma.rules.findMany();
  }

  async findOne(id: Number) {
    return this.prisma.rules.findUnique({
      where: { id: Number(id) },
    });
  }

  async update(id: Number, updateRuleDto: UpdateRuleDto) {
    return this.prisma.rules.update({
      where: { id: Number(id) },
      data: updateRuleDto,
    });
  }

  async remove(id: Number) {
    return this.prisma.rules.delete({
      where: { id: Number(id) },
    });
  }
}
