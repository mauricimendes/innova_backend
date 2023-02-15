"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const date_fns_1 = require("date-fns");
const task_entity_1 = require("./entities/task.entity");
const AppError_1 = require("../shared/errors/AppError");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create({ title, description, difficulty, date }) {
        const task = this.tasksRepository.create({
            title,
            date,
            description,
            difficulty
        });
        return await this.tasksRepository.save(task);
    }
    async findAll(difficulty, date) {
        if (!date)
            throw new AppError_1.default('Date not found.', 404);
        const dateFormat = date.toString().split('T')[0];
        const initialDate = new Date(dateFormat);
        let finalDate = (0, date_fns_1.addHours)(initialDate, 23);
        finalDate = (0, date_fns_1.addMinutes)(finalDate, 59);
        finalDate = (0, date_fns_1.addSeconds)(finalDate, 59);
        console.log(difficulty === null ? 'teste' : 'tem coisa');
        return await this.tasksRepository.find({
            where: {
                difficulty,
                date: (0, typeorm_2.Between)(initialDate, finalDate)
            },
            order: { created_at: 'ASC' }
        });
    }
    async checked(id) {
        let task = await this.tasksRepository.findOne({ where: { id } });
        if (!task)
            throw new AppError_1.default('Task not found.', 404);
        const alterTask = await this.tasksRepository.update(id, {
            checked: !task.checked
        });
        return alterTask;
    }
    async remove(id) {
        return await this.tasksRepository.softDelete({ id: id });
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map