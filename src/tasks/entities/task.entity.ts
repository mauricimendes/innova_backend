import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm'

import User from 'src/users/entities/user.entity'

@Entity('tasks')
export default class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    checked: boolean

    @Column()
    date: Date

    @Column()
    difficulty: string
    
    @Column()
    user_id: string
   
    @OneToMany(() => User, user => user.id)
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}
