"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
exports.dataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 32768,
    username: 'postgres',
    password: 'postgrespw',
    database: 'mytasks',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/shared/migrations/*.js'],
    synchronize: false
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map