import { ApiModelProperty } from '@nestjs/swagger';

export class Cat {
    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    age: number;

    @ApiModelProperty()
    breed: string;
}
