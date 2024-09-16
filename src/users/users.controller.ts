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
import { ApiTags } from '@nestjs/swagger';
import { SwitchRoleDto } from './dto/switch-role.dto';

@ApiTags('users')
@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      return { message: `User with id ${id} not found` };
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.usersService.remove(+id);
    if (!deleted) {
      return { message: `User with id ${id} not found or already deleted` };
    }
    return { message: `User with id ${id} successfully deleted` };
  }

  @Patch(':id/switch-role')
  async updateRole(
    @Param('id') id: number,
    @Body() switchRoleDto: SwitchRoleDto,
  ) {
    const { role } = switchRoleDto;
    return this.usersService.updateUserRole(+id, role);
  }
}
