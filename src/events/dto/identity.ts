import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class IdentityDto {
    @IsNumber()
    @ApiModelProperty()
    readonly id: number;
}
