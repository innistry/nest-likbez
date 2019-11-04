import { Field, InputType } from 'type-graphql';

@InputType()
export class UpvotePostInput {
    @Field() postId: number;
}
