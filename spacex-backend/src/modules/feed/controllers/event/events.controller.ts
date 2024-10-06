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

import { EventsService } from '../../services/event/event.service';
import { CreateEventDto } from '../../dto/create-event.dto';
import { UpdateEventDto } from '../../dto/update-event.dto';

import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('feed/events')
@Controller('feed/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Creating event.', type: CreateEventDto })
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all events.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch with specific event id.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update with specific event id.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete event.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(+id);
  }
}
