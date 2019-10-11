import { ApiModelProperty } from '@nestjs/swagger';
import { ListDto } from './list.dto';
import { CatDto } from './cat.dto';

export class CatsDto extends ListDto<CatDto> {
    @ApiModelProperty({
        type: CatDto,
    })
    items: CatDto[];
}
