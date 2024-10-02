import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './modules/users/entities/user.entity';
import { Event } from './modules/feed/entities/event.entity';
import { Feed } from './modules/feed/entities/feed.entity';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Event, Feed],
  synchronize: process.env.TYPEORM_SYNC === 'true',
  migrations: ['src/migrations/*.ts'],
});
