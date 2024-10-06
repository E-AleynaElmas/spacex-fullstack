import {
  BadRequestException,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { Express } from 'express';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload image.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum dosya boyutu (5MB)
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Unsupported file type.'), false);
        }
      },
    }),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', // Swagger için binary format
        },
      },
    },
  })
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('Image file is required.');
    }

    try {
      const bucket = this.firebaseAdmin.storage().bucket();
      const fileName = `${Date.now()}_${image.originalname}`;
      const file = bucket.file(fileName);

      // Firebase'e dosya kaydetme
      await file.save(image.buffer, {
        metadata: {
          contentType: image.mimetype,
        },
      });

      // İmzalı URL oluşturma
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
      });

      return { imageUrl: url };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error uploading file to Firebase.');
    }
  }
}
