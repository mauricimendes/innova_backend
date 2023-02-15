import { Repository } from 'typeorm';
import Task from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    create({ title, description, difficulty, date }: CreateTaskDto): Promise<Task>;
    findAll(difficulty: string, date: Date): Promise<Task[]>;
    checked(id: string): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
