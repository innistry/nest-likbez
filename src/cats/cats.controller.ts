import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Roles, RolesGuard } from '../roles.guard';
import { WithTime } from '../logging.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@WithTime
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    @Roles('admin')
    async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
        return this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':age')
    async findByAge(@Param('age', new ParseIntPipe()) id): Promise<Cat[]> {
        return this.catsService.findByAge(id);
    }
}
