import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadFileWithImageDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: any;
}
