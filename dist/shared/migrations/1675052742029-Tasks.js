"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks1675052742029 = void 0;
const typeorm_1 = require("typeorm");
class Tasks1675052742029 {
    async up(queryRunner) {
        return await queryRunner.createTable(new typeorm_1.Table({
            name: 'tasks',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'checked',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'date',
                    type: 'timestamp'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true
                },
            ],
        }));
    }
    async down(queryRunner) {
        return await queryRunner.dropTable('tasks');
    }
}
exports.Tasks1675052742029 = Tasks1675052742029;
//# sourceMappingURL=1675052742029-Tasks.js.map