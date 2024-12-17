import path from 'node:path';
import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  entities: [path.join(__dirname, "/entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "/migrations/**/*.{ts,js}")],
})