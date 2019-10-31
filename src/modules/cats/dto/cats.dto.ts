import { ApiModelProperty } from '@nestjs/swagger';
import { CatDto } from './cat.dto';
import { ListDto } from './list.dto';

export class CatsDto extends ListDto<CatDto> {
    @ApiModelProperty({
        type: CatDto,
    })
    items: CatDto[];
}
