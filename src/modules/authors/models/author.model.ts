import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Author {
    @Field(() => Int, { nullable: true })
    id: number;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;
}
