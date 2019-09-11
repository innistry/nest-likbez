import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreatePhotoDto {
    @ApiModelProperty()
    @IsString()
    name: string;

    @ApiModelProperty()
    @IsString()
    description: string;

    @ApiModelProperty()
    @IsString()
    filename: string;

    @ApiModelProperty()
    @IsNumber()
    views: number;

    @ApiModelProperty()
    @IsBoolean()
    isPublished: boolean;

    @ApiModelProperty()
    @IsNumber()
    height: number;

    @ApiModelProperty()
    @IsNumber()
    width: number;

    @ApiModelProperty()
    @IsString()
    orientation: string;

    @ApiModelProperty()
    @IsBoolean()
    compressed: boolean;

    @ApiModelProperty()
    @IsString()
    comment: string;
}
