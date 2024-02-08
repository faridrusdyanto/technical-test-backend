import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find()
    return users
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async create(user: User): Promise<User> {
    
    const data = {
      ...user,
      password: await hash(user.password, 10)
    }
    const res = await  this.userModel.create(data)
    return res
  }

  async updateById(id: string, user: User): Promise<User> {
    if (user.password) {
      user.password = await hash(user.password, 10)
    }
    
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true
    })
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id)
  }
}
