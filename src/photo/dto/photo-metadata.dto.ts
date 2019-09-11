import {ApiModelProperty} from '@nestjs/swagger';
import { PhotoMetadata } from '../photo-metadata.entity';

export class PhotoMetadataDto {
    @ApiModelProperty()
    id: number;
    @ApiModelProperty()
    height: number;
    @ApiModelProperty()
    width: number;
    @ApiModelProperty()
    orientation: string;
    @ApiModelProperty()
    compressed: boolean;
    @ApiModelProperty()
    comment: string;

    constructor(item: PhotoMetadata) {
        this.id = item.id;
        this.height = item.height;
        this.width = item.width;
        this.orientation = item.orientation;
        this.compressed = item.compressed;
        this.comment = item.comment;
    }
}
