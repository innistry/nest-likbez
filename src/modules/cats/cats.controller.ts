import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Roles, RolesGuard } from '../../guards/roles.guard';
import { WithTime } from '../../interceptors/logging.interceptor';
import { CatsService } from './cats.service';
import { CatDto } from './dto/cat.dto';
import { CatsDto } from './dto/cats.dto';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
@UseGuards(RolesGuard)
@WithTime
@ApiUseTags('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    @Roles('admin')
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CatDto,
    })
    @ApiForbiddenResponse({ description: 'Only admins allowed.' })
    async create(@Body() createCatDto: CreateCatDto): Promise<CatDto> {
        const item = this.catsService.create(createCatDto);
        return new CatDto(item);
    }

    @Get()
    @ApiResponse({ status: 200, type: CatsDto })
    async findAll(): Promise<CatsDto> {
        const [items, count] = this.catsService.findAll();
        return {
            items: items.map(item => new CatDto(item)),
            count,
        };
    }

    @Get(':age')
    @ApiNotFoundResponse({ description: 'Not found such cats.' })
    @ApiResponse({ status: 200, type: CatsDto })
    async findByAge(@Param('age', new ParseIntPipe()) id): Promise<CatsDto> {
        const [items, count] = this.catsService.findByAge(id);
        return {
            items: items.map(item => new CatDto(item)),
            count,
        };
    }
}
