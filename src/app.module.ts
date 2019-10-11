import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './modules/cats/cats.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './modules/photo/photo.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './modules/articles/articles.module';
import { ConfigModule } from './modules/config/config.module';
import { EventsModule } from './modules/events/events.module';
import { MathModule } from './modules/math/math.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorsModule } from './modules/authors/authors.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
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
