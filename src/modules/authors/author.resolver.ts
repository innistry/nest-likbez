import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveProperty, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { AuthorArgs } from './args/author.args';
import { UpvotePostInput } from './inputs/upvote-post.input';
import { Author } from './models/author.model';
import { Post } from './models/post.model';

@Resolver(() => Author)
export class AuthorResolver {
    constructor(private readonly pubSub: PubSub) {}

    protected authors: Author[] = [
        {
            id: 1,
            firstName: 'Ilia',
            posts: [
                {
                    id: 1,
                    votes: 12,
                    title: 'My first post',
                    creationDate: new Date(),
                },
            ],
        },
        {
            id: 2,
            firstName: 'Naryshkin',
            posts: [],
        },
    ];

    @Query(() => Author, { name: 'author' })
    async getAuthor(@Args() args: AuthorArgs): Promise<Author> {
        const author = this.authors.find(item => item.id === args.id);

        if (!author) {
            throw new NotFoundException(args.id);
        }

        return author;
    }

    @Mutation(() => Post)
    async upvotePost(@Args('data') args: UpvotePostInput): Promise<Post> {
        const post = this.authors[0].posts.find(item => item.id === args.postId);

        if (!post) {
            throw new NotFoundException(post.id);
        }

        post.votes++;
        this.pubSub.publish('upvote', post);

        return post;
    }

    @ResolveProperty('posts', () => [Post])
    async getPosts(@Parent() author: Author): Promise<Post[]> {
        return author.posts.map(item => {
            return item;
        });
    }

    @Subscription(() => Post, {
        filter: (payload: Post) => {
            return payload.votes > 12;
        },
        resolve: (value: Post) => {
            value.title += 'hi-hi';
            return value;
        },
    })
    upvote(): AsyncIterator<Post> {
        return this.pubSub.asyncIterator('upvote');
    }
}

/* GraphQL queries

query {
  author(id: 1) {
    id
    posts {
      id
      title
      creationDate
    }
  }
}

mutation {
  upvotePost(data: {postId: 1}) {
    id
    title
    votes
  }
}

subscription {
  upvote{
    id
    title
  }
}
 */
