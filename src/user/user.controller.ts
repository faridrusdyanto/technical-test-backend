import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users
  }

  @Post()
  async createUser(
    @Body()
    user: CreateUserDto
  ): Promise<User> {
    return this.userService.create(user)
  }
  
  @Get(':id')
  async getUserById(
    @Param('id')
    id: string
  ): Promise<User> {
    const users = await this.userService.findById(id);
    return users
  }

  @Put(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateById(id, user)
  }

  @Delete(':id')
  async deleteUserById(
    @Param('id')
    id: string
  ): Promise<User> {
    const users = await this.userService.deleteById(id);
    return users
  }
}
