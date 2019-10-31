import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoMetadata } from './photo-metadata.entity';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Module({
    imports: [TypeOrmModule.forFeature([Photo, PhotoMetadata])],
    controllers: [PhotoController],
    providers: [PhotoService],
    exports: [TypeOrmModule],
})
export class PhotoModule {}
