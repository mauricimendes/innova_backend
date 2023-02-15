"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnDificultyInTasks1675052885498 = void 0;
const typeorm_1 = require("typeorm");
class AddCollumnDificultyInTasks1675052885498 {
    async up(queryRunner) {
        return await queryRunner.addColumn('tasks', new typeorm_1.TableColumn({
            name: 'difficulty',
            type: 'varchar'
        }));
    }
    async down(queryRunner) {
        return await queryRunner.dropColumn('tasks', 'difficulty');
    }
}
exports.AddCollumnDificultyInTasks1675052885498 = AddCollumnDificultyInTasks1675052885498;
//# sourceMappingURL=1675052885498-AddCollumnDificultyInTasks.js.map