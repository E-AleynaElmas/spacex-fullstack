// src/modules/feed/dto/create-feed-with-image.dto.ts

import { CreateFeedDto } from './create-feed.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedWithImageDto extends CreateFeedDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: any;
}
