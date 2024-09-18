import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SwitchRoleDto } from './dto/switch-role.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUserByIdDto } from './dto/get-user-id.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@ApiTags('users')
@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  @ApiOkResponse({ type: [GetUserDto] })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GetUserByIdDto })
  async findOne(@Param() params: GetUserByIdDto) {
    const user = await this.usersService.findOne(params.id);
    if (!user) {
      return { message: `User with id ${params.id} not found` };
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteUserDto })
  async remove(@Param() params: DeleteUserDto) {
    const deleted = await this.usersService.remove(params.id);
    if (!deleted) {
      return {
        message: `User with id ${params.id} not found or already deleted`,
      };
    }
    return { message: `User with id ${params.id} successfully deleted` };
  }

  @Patch(':id/switch-role')
  async updateRole(
    @Param('id') id: string,
    @Body() switchRoleDto: SwitchRoleDto,
  ) {
    const { role } = switchRoleDto;
    return this.usersService.updateUserRole(id, role);
  }
}
