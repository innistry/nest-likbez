import { ApiModelProperty } from '@nestjs/swagger';
import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export class Article extends Document {
    @ApiModelProperty()
    readonly title: string;

    @ApiModelProperty()
    readonly text: string;
}

export const ArticleSchema = new mongoose.Schema({
    title: String,
    text: String,
});
