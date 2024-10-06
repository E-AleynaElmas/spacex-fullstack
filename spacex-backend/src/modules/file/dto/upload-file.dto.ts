import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    description: "Firebase tarafından döndürülen dosya URL'si",
    example:
      'https://firebasestorage.googleapis.com/v0/b/your-app.appspot.com/o/images%2Fexample.jpg?alt=media',
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}
