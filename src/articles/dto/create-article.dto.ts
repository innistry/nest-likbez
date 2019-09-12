import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateArticleDto {
    @ApiModelProperty()
    @IsString()
    title: string;

    @ApiModelProperty()
    @IsString()
    text: string;
}
