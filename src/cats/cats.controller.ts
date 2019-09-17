import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Roles, RolesGuard } from '../roles.guard';
import { WithTime } from '../logging.interceptor';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CatDto } from './dto/cat.dto';
import { ListDto } from './dto/list.dto';

@Controller('cats')
@UseGuards(RolesGuard)
@WithTime
@ApiUseTags('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    @Roles('admin')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: CatDto})
    @ApiForbiddenResponse({ description: 'Only admins allowed.' })
    async create(@Body() createCatDto: CreateCatDto): Promise<CatDto> {
        const cat = this.catsService.create(createCatDto);
        return new CatDto(cat);
    }

    @Get()
    @ApiResponse({ status: 200, type: ListDto})
    async findAll(): Promise<ListDto<CatDto>> {
        const [cats, count] = this.catsService.findAll();
        return {
            items: cats.map(item => new CatDto(item)),
            count,
        };
    }

    @Get(':age')
    @ApiNotFoundResponse({ description: 'Not found such cats.' })
    @ApiResponse({ status: 200, type: ListDto})
    async findByAge(@Param('age', new ParseIntPipe()) id): Promise<ListDto<CatDto>> {
        const [cats, count] = this.catsService.findByAge(id);
        return {
            items: cats.map(item => new CatDto(item)),
            count,
        };
    }
}
