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
import { InvocationService } from './invocation.service';
import { CreateInvocationDto } from './dto/create-invocation.dto';
import { UpdateInvocationDto } from './dto/update-invocation.dto';

@ApiTags('eldritch invocations')
@Controller('/api/eldritch-invocations')
export class InvocationController {
  constructor(private readonly invocationService: InvocationService) {}

  @Get()
  getAllInvocations() {
    return this.invocationService.getAllInvocation();
  }

  @Get(':id')
  getInvocationById(@Param('id') id: string) {
    return this.invocationService.getInvocationById(id);
  }

  @Post()
  createInvocation(@Body() createInvocationDto: CreateInvocationDto) {
    return this.invocationService.createInvocation(createInvocationDto);
  }

  @Put(':id')
  updateInvocation(
    @Body() updateInvocationDto: UpdateInvocationDto,
    @Param('id') id: string,
  ) {
    return this.invocationService.updateInvocation(updateInvocationDto, id);
  }

  @Delete(':id')
  deleteInvocation(@Param('id') id: string) {
    return this.invocationService.deleteInvocation(id);
  }
}
