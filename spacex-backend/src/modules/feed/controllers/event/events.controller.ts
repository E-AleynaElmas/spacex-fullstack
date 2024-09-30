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
  UseGuards,
} from '@nestjs/common';

import { EventsService } from '../../services/event/event.service';
import { CreateEventDto } from '../../dto/create-event.dto';
import { UpdateEventDto } from '../../dto/update-event.dto';

import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Inject } from '@nestjs/common';

import * as admin from 'firebase-admin';

import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { CreateEventWithImageDto } from '../../dto/create-event-with-image.dto';

@ApiTags('feed/events')
@Controller('feed/events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    description: 'Creating event.',
    type: CreateEventWithImageDto,
  })
  async create(
    @Body() createEventDto: CreateEventDto,
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

      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
      });

      createEventDto['imageUrl'] = url;
    }

    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch with specific event id.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update with specific event id.' })
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete event.' })
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
