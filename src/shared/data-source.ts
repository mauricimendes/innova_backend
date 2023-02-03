import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 32768,
    username: 'postgres',
    password: 'postgrespw',
    database: 'mytasks',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/shared/migrations/*.js'],
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource