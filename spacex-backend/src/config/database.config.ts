import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'testuser',
  password: 'testuser123',
  database: 'my_database',
  entities: [User],
  //synchronize: geliştirme aşamasında true, ancak üretim ortamında false olarak ayarlanmalıdır.
  synchronize: true,
};
