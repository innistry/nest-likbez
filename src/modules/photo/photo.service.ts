import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PhotoMetadata } from './photo-metadata.entity';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
        @InjectRepository(PhotoMetadata)
        private readonly photoMetadataRepository: Repository<PhotoMetadata>,
    ) {}

    findAll(): Promise<Photo[]> {
        return this.photoRepository.find({ relations: ['metadata'] });
    }

    async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.description = createPhotoDto.description;
        photo.filename = createPhotoDto.filename;
        photo.views = createPhotoDto.views;
        photo.isPublished = createPhotoDto.isPublished;

        photo.metadata = new PhotoMetadata();
        photo.metadata.height = createPhotoDto.height;
        photo.metadata.width = createPhotoDto.width;
        photo.metadata.compressed = createPhotoDto.compressed;
        photo.metadata.comment = createPhotoDto.comment;
        photo.metadata.orientation = createPhotoDto.orientation;

        return this.photoRepository.save(photo);
    }

    async clear() {
        return this.photoRepository.clear();
    }
}
