import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
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
