import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

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
