import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedModule } from './modules/feed/feed.module';

@Module({
  imports: [TypeOrmModule.forRoot(DatabaseConfig), UsersModule, AuthModule, FeedModule],
})
export class AppModule {}
