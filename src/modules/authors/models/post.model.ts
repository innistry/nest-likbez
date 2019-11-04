import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    title: string;

    @Field(() => Int)
    votes: number;

    @Field({ nullable: true })
    creationDate?: Date;
}
