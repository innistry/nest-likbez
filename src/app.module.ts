import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from './config/config.module';
import { EventsModule } from './events/events.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 4321,
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
    ],
    controllers: [AppController],
})
export class AppModule {}
