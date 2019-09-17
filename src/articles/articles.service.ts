import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.scheme';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Article.name) private readonly articleModel: Model<Article>,
    ) {}

    findAll(): Promise<Article[]> {
        return this.articleModel.find();
    }

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const article = new this.articleModel(createArticleDto);
        return article.save();
    }

    async clear() {
        return this.articleModel.remove();
    }
}
