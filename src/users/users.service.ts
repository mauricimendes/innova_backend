import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import User from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(user)
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({ where: { email }})
  }
}
