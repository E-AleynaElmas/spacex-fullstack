import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { FeedService } from './services/feed/feed.service';
import { FeedController } from './controllers/feed/feed.controller';
import { EventService } from './services/event/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  providers: [FeedService, EventService],
  controllers: [FeedController],
})
export class FeedModule {}
