import { Module } from '@nestjs/common';
import { FileService } from './services/file/file.service';
import { FileController } from './controllers/file/file.controller';

@Module({
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
