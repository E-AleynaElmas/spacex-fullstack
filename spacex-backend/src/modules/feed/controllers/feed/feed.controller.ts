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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    description: 'Creating feeds',
    type: CreateFeedDto,
  })
  create(
    @Body() createFeedDto: CreateFeedDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // Resim yükleme işlemi burada yapılacak
    // createFeedDto.imageUrl = yüklenen resmin URL'si
    return this.feedService.create(createFeedDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm feedleri getir' })
  findAll() {
    return this.feedService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Belirli bir feed getir' })
  findOne(@Param('id') id: string) {
    return this.feedService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Feed güncelle' })
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Feed sil' })
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
