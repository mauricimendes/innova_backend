export class CreateTaskDto {
    title: string
    description: string
    date: Date
    difficulty: 'easy' | 'medium' | 'hard'
}
