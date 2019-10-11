import { Query, Resolver } from 'type-graphql';
import { Author } from './models/author.model';

@Resolver(() => Author)
export class AuthorResolver {
    @Query(() => Author, { name: 'author' })
    getAuthor(): Author {
        return {
            id: 1,
            firstName: 'asd',
            lastName: 'asd',
        };
    }
}
