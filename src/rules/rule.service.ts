import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class RuleService {
  constructor(private prisma: PrismaService) {}

  async getAllRule() {
    const rule = await this.prisma.rules.findMany();
    return rule;
  }

  async getRuleById(id: string) {
    const rule = await this.prisma.rules.findUnique({
      where: { id },
    });
    if (!rule) {
      throw new NotFoundException(`Rule with ID ${id} not found`);
    }
    return rule;
  }

  async createRule(createRuleDto: CreateRuleDto) {
    const newRule = await this.prisma.rules.create({
      data: createRuleDto,
    });
    return newRule;
  }

  async updateRule(id: string, updateRuleDto: UpdateRuleDto) {
    const updatedRule = await this.prisma.rules.update({
      where: { id },
      data: updateRuleDto,
    });
    return updatedRule;
  }

  async deleteRule(id: string) {
    const deletedRule = await this.prisma.rules.delete({
      where: { id },
    });
    return {
      message: `Rule wiyh ID ${id} deleted`,
      deletedRule,
    };
  }
}
