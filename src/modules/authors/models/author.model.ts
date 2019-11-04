import { Field, Int, ObjectType } from 'type-graphql';
import { Post } from './post.model';

@ObjectType()
export class Author {
    @Field(() => Int)
    id: number;

    @Field(() => String, { nullable: true })
    firstName?: string;

    @Field(() => String, { nullable: true })
    lastName?: string;

    @Field(() => [Post])
    posts?: Post[];
}
