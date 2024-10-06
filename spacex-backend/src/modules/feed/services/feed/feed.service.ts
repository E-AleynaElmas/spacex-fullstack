import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from '../../entities/feed.entity';
import { CreateFeedDto } from '../../dto/create-feed.dto';
import { UpdateFeedDto } from '../../dto/update-feed.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private feedRepository: Repository<Feed>,
  ) {}

  async create(createFeedDto: CreateFeedDto): Promise<Feed> {
    const feed = this.feedRepository.create(createFeedDto);
    return this.feedRepository.save(feed);
  }

  async findAll(): Promise<Feed[]> {
    return this.feedRepository.find();
  }

  async findOne(id: number): Promise<Feed> {
    const feed = await this.feedRepository.findOne({ where: { id } });
    if (!feed) {
      throw new NotFoundException(`Feed with ID ${id} not found`);
    }
    return feed;
  }

  async update(id: number, updateFeedDto: UpdateFeedDto): Promise<Feed> {
    await this.feedRepository.update(id, updateFeedDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Feed> {
    const feed = await this.findOne(id);

    const result = await this.feedRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Feed with ID ${id} not found`);
    }

    return feed;
  }
}
