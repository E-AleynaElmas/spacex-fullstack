import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedModule } from './modules/feed/feed.module';
import { FirebaseModule } from './modules/firebase/firebase/firebase.module';
import { User } from './modules/users/entities/user.entity';
import { Feed } from './modules/feed/entities/feed.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      entities: [User, Feed], // Feed entity'sini ekledik
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FeedModule,
    FirebaseModule,
  ],
})
export class AppModule {}
