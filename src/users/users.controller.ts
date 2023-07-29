import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUsers() {
    return this.userService.findAllUser();
  }

  @Post()
  async createUser(@Body() createUserdto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserdto);
      return user;
    } catch (err) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
  }

  // @Catch(HttpException)
  @Get(':id')
  async findUser(@Param('id') id: number) {
    return this.userService.findOneUser(id);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    try {
      return this.userService.removeUser(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException('Invalid input', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Unexpected error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
