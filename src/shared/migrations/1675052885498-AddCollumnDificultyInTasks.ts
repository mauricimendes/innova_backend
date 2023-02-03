import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddCollumnDificultyInTasks1675052885498 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.addColumn(
            'tasks',
            new TableColumn({
                name: 'difficulty',
                type: 'varchar'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropColumn('tasks', 'difficulty')
    }

}
