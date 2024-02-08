import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create.user.dto';

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
}
