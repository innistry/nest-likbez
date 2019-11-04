import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AuthorResolver } from './author.resolver';
import { DateScalar } from './scalars/date.scalar';

@Module({
    providers: [
        AuthorResolver,
        /**
         * To take use of multiple node instance => Redis
         * https://dev.to/thisdotmedia/graphql-subscriptions-with-nest-how-to-publish-across-multiple-running-servers-15e
         */
        {
            provide: PubSub,
            useValue: new PubSub(),
        },
        DateScalar,
    ],
})
export class AuthorsModule {}
