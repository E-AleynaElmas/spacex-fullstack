import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { FeedService } from './services/feed/feed.service';
import { FeedController } from './controllers/feed/feed.controller';
import { EventService } from './services/event/event.service';
import { EventController } from './controllers/event/events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  providers: [FeedService, EventService],
  controllers: [FeedController, EventController],
})
export class FeedModule {}
