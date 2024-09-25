import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@ApiTags('rules')
@Controller('/api/rules')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  async getAllRules() {
    return this.ruleService.getAllRule();
  }

  @Get(':id')
  async getRuleById(@Param('id') id: string) {
    return this.ruleService.getRuleById(id);
  }

  @Post()
  async createRule(@Body() createRuleDto: CreateRuleDto) {
    return this.ruleService.createRule(createRuleDto);
  }

  @Put(':id')
  async updateRule(
    @Param('id') id: string,
    @Body() updateRuleDto: UpdateRuleDto,
  ) {
    return this.ruleService.updateRule(id, updateRuleDto);
  }

  @Delete(':id')
  async deleteRule(@Param('id') id: string) {
    return this.ruleService.deleteRule(id);
  }
}
