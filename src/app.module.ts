import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { CatsModule } from './modules/cats/cats.module';
import { ConfigModule } from './modules/config/config.module';
import { EventsModule } from './modules/events/events.module';
import { MathModule } from './modules/math/math.module';
import { PhotoModule } from './modules/photo/photo.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: true,
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'pass',
            database: 'db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
        }),
        MongooseModule.forRoot('mongodb://localhost:27017/mongo'),
        CacheModule.register({
            ttl: 5, // seconds
            max: 10, // maximum number of items in cache
        }),
        CatsModule,
        AuthModule,
        PhotoModule,
        ArticlesModule,
        ArticlesModule,
        ConfigModule,
        EventsModule,
        MathModule,
        AuthorsModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
