import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RulesService } from './rules.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { GetRuleDto } from './dto/get-rule.dto';
import { DeleteRuleDto } from './dto/delete-rule.dto';

@ApiTags('rules')
@Controller('/api/rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  @ApiOkResponse({ type: CreateRuleDto })
  async create(@Body() createRuleDto: CreateRuleDto) {
    return this.rulesService.create(createRuleDto);
  }

  @Get()
  @ApiOkResponse({ type: [GetRuleDto] })
  async findAll() {
    return this.rulesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: [GetRuleDto] })
  async findOne(@Param('id') id: number) {
    return this.rulesService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRuleDto: UpdateRuleDto) {
    return this.rulesService.update(+id, updateRuleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteRuleDto })
  async remove(@Param('id') id: number) {
    return this.rulesService.remove(+id);
  }
}
