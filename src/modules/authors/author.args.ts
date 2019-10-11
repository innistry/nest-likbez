import { Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class AuthorArgs {
    @Field(() => Int)
    @Min(1)
    id: number;
}
