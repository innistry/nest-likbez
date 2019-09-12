import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './schemas/article.scheme';

@Controller('articles')
@ApiUseTags('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Post()
    @ApiCreatedResponse({ type: Article })
    async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    @ApiOkResponse({ type: Article, isArray: true })
    async findAll(): Promise<Article[]> {
        return this.articlesService.findAll();
    }

    @Post('clear')
    @ApiOkResponse({ description: 'Clear all data' })
    @HttpCode(200)
    async clear() {
        return this.articlesService.clear();
    }
}
