import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService],
})
export class CatsModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(CatsController);
    }
}
