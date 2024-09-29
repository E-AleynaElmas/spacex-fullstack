import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedDto {
  @ApiProperty({ description: 'Title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date', example: '2024-07-05T10:00:00' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Image URL', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
