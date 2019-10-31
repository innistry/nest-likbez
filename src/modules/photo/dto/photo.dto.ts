import { ApiModelProperty } from '@nestjs/swagger';
import { Photo } from '../photo.entity';
import { PhotoMetadataDto } from './photo-metadata.dto';

export class PhotoDto {
    @ApiModelProperty()
    id?: number;
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    description: string;
    @ApiModelProperty()
    filename: string;
    @ApiModelProperty()
    views: number;
    @ApiModelProperty()
    isPublished: boolean;

    @ApiModelProperty()
    metadata?: PhotoMetadataDto;

    constructor(item: Photo) {
        this.id = item.id;
        this.name = item.name;
        this.description = item.description;
        this.filename = item.filename;
        this.views = item.views;
        this.isPublished = item.isPublished;

        this.metadata = item.metadata ? new PhotoMetadataDto(item.metadata) : null;
    }
}
