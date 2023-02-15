import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Repository } from 'typeorm'
import { addHours, addMinutes, addSeconds } from 'date-fns'

import Task from './entities/task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import AppError from 'src/shared/errors/AppError'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async create({title, description, difficulty, date }: CreateTaskDto) {
    const task = this.tasksRepository.create({
      title,
      date,
      description,
      difficulty
    })

    return await this.tasksRepository.save(task)
  }

  async findAll(difficulty: string, date: Date) {
    if ( !date ) throw new AppError('Date not found.', 404)

    const dateFormat = date.toString().split('T')[0]

    const initialDate = new Date(dateFormat)

    let finalDate = addHours(initialDate, 23)
    finalDate = addMinutes(finalDate, 59)
    finalDate = addSeconds(finalDate, 59)

    console.log(difficulty === null ? 'teste' : 'tem coisa')

    return await this.tasksRepository.find({
      where: {
        difficulty,
        date: Between(initialDate, finalDate)
      },
      order: { created_at: 'ASC' }
    })
  }

  async checked(id: string) {

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
