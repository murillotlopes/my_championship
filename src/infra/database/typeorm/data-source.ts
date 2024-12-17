import path from 'node:path';
import { DataSource } from 'typeorm';

const schema = process.env.NODE_ENV === 'test' ? 'test' : 'public'
const synchronize = process.env.NODE_ENV == 'test'

export const AppDataSource =
  new DataSource({
    schema,
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: synchronize,
    entities: [path.join(__dirname, "/entities/**/*.{ts,js}")],
    migrations: [path.join(__dirname, "/migrations/**/*.{ts,js}")],
  })