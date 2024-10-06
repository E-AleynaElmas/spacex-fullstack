import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

import { CreateFeedDto } from '../../dto/create-feed.dto';
import { UpdateFeedDto } from '../../dto/update-feed.dto';
import { FeedService } from '../../services/feed/feed.service';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feed.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Creating feeds',
    type: CreateFeedDto,
  })
  async create(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feeds.' })
  findAll() {
    return this.feedService.findAll();
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: 'Fetch with specific feed id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.feedService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update with specific feed id.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeedDto: UpdateFeedDto,
  ) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feed.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.feedService.remove(+id);
  }
}
