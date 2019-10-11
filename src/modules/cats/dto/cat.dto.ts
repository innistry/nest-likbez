import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class CatDto {
    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    age: number;

    @Exclude()
    breed: string;

    @ApiModelProperty()
    @Expose()
    get agePlus(): number {
        return this.age + 1;
    }

    constructor(partial: Partial<CatDto>) {
        Object.assign(this, partial);
    }
}
