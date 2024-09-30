import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { Event } from './entities/event.entity';
import { FeedService } from './services/feed/feed.service';
import { FeedController } from './controllers/feed/feed.controller';
import { EventsService } from './services/event/event.service';
import { EventsController } from './controllers/event/events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, Event])],
  providers: [FeedService, EventsService],
  controllers: [FeedController, EventsController],
})
export class FeedModule {}
