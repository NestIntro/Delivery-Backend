import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAllUsers() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  async findUser(@Param('id') id: number) {
    return this.userService.findOneUser(id);
  }

  @Post()
  async createUser(@Body() createUserdto: CreateUserDto) {
    const user = await this.userService.createUser(createUserdto);
    return user;
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    return this.userService.removeUser(id);
  }
}
