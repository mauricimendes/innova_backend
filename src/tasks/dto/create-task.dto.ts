export class CreateTaskDto {
    title: string
    description: string
    email: string
    date: Date
    difficulty: 'easy' | 'medium' | 'hard'
}
