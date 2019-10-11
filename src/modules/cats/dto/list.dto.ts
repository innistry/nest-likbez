import { ApiModelProperty } from '@nestjs/swagger';

export class ListDto <T> {
    @ApiModelProperty({
        type: [Object],
    })
    items: T[];

    @ApiModelProperty()
    count: number;
}
