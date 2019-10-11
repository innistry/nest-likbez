import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PhotoMetadata } from './photo-metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, PhotoMetadata])],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [TypeOrmModule],
})
export class PhotoModule {}
