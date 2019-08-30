import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Roles, RolesGuard } from '../roles.guard';
import { WithTime } from '../logging.interceptor';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@Controller('cats')
@UseGuards(RolesGuard)
@WithTime
@ApiUseTags('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    @Roles('admin')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: Cat})
    @ApiForbiddenResponse({ description: 'Only admins allowed.' })
    async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':age')
    @ApiNotFoundResponse({ description: 'Not found such cats.' })
    async findByAge(@Param('age', new ParseIntPipe()) id): Promise<Cat[]> {
        return this.catsService.findByAge(id);
    }
}
