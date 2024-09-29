import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFeedDto } from '../../dto/create-feed.dto';
import { UpdateFeedDto } from '../../dto/update-feed.dto';
import { FeedService } from '../../services/feed/feed.service';
import { Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feed.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    description: 'Creating feeds',
    type: CreateFeedDto,
  })
  async create(
    @Body() createFeedDto: CreateFeedDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      const bucket = this.firebaseAdmin.storage().bucket();
      const fileName = `${Date.now()}_${image.originalname}`;
      const file = bucket.file(fileName);

      await file.save(image.buffer, {
        metadata: {
          contentType: image.mimetype,
        },
      });

      // Dosyanın genel URL'sini alın
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
      });

      createFeedDto.imageUrl = url;
    }
    return this.feedService.create(createFeedDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feeds.' })
  findAll() {
    return this.feedService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch with specific feed id.' })
  findOne(@Param('id') id: string) {
    return this.feedService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update with specific feed id.' })
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feed.' })
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
