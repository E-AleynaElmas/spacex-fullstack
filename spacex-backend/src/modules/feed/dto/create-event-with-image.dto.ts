import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventWithImageDto extends CreateEventDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: any;
}
