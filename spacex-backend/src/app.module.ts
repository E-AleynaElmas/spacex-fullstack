import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedModule } from './modules/feed/feed.module';
import { FirebaseModule } from './modules/firebase/firebase/firebase.module';
import { User } from './modules/users/entities/user.entity';
import { Feed } from './modules/feed/entities/feed.entity';
import { Event } from './modules/feed/entities/event.entity';
import { DatabaseConfig } from './config/database.config';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.local',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: DatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Feed, Event]),
    UsersModule,
    AuthModule,
    FeedModule,
    FirebaseModule,
    FileModule,
  ],
})
export class AppModule {}
