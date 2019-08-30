import { IsInt, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateCatDto {
    @IsString()
    @ApiModelProperty({
        example: 'Cindy',
    })
    readonly name: string;

    @IsInt()
    @ApiModelProperty({
        example: 12,
    })
    readonly age: number;

    @IsString()
    @ApiModelPropertyOptional({
        example: 'Maine coon',
        enum: ['Maine coon', 'Other'],
    })
    readonly breed: string;
}
