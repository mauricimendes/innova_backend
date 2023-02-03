import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Repository } from 'typeorm'
import { format, parseISO, addHours, addMinutes, addSeconds } from 'date-fns'

import Task from './entities/task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { UsersService } from 'src/users/users.service'
import AppError from 'src/shared/errors/AppError'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,

    private readonly usersService: UsersService
  ) {}

  async create({title, description, email, difficulty, date }: CreateTaskDto) {
    const checkeUserExists = await this.usersService.findOne(email)

    if ( !checkeUserExists ) throw new AppError('User not found.', 404)

    const task = this.tasksRepository.create({
      title,
      date,
      description,
      user_id: checkeUserExists.id,
      difficulty
    })

    return await this.tasksRepository.save(task)
  }

  async findAll(email: string, difficulty: string, date: Date) {
    const checkeUserExists = await this.usersService.findOne(email)

    if ( !checkeUserExists ) throw new AppError('User not found.', 404)

    if ( !date ) throw new AppError('Date not found.', 404)

    const dateFormat = format(parseISO(date.toString()), 'yyyy-MM-dd')
    const initialDate = new Date(dateFormat)
    let finalDate = addHours(initialDate, 23)
    finalDate = addMinutes(finalDate, 59)
    finalDate = addSeconds(finalDate, 59)

    return await this.tasksRepository.find({
      where: { 
        user_id: checkeUserExists.id, 
        difficulty,
        date: Between(initialDate, finalDate)
      }, 
      order: { created_at: 'ASC' }
    })
  }

  async checked(id: string, updateTaskDto: UpdateTaskDto) {
    const checkeUserExists = await this.usersService.findOne(updateTaskDto.email)

    if ( !checkeUserExists ) throw new AppError('User not found.', 404)

    let task = await this.tasksRepository.findOne({ where: { id }})

    if ( !task ) throw new AppError('Task not found.', 404)
    
    const alterTask = await this.tasksRepository.update(id, {
      checked: !task.checked
    })

    return alterTask
  }

  async remove(id: string) {
    return await this.tasksRepository.softDelete({ id: id })
  }
}
