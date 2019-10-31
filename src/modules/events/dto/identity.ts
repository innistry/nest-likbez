import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class IdentityDto {
    @IsNumber()
    @ApiModelProperty()
    readonly id: number;
}
