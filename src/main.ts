import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

declare const module: any;

(async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(helmet());
    // app.useGlobalPipes(new ValidationPipe({
    //     transform: true,
    // }));
    app.enableCors();
    // app.use(
    //     rateLimit({
    //         windowMs: 15 * 60 * 1000, // 15 minutes
    //         max: 100, // limit each IP to 100 requests per windowMs
    //     }),
    // );
    app.use(compression());

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    const options = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options, {
        include: [AppModule],
        deepScanRoutes: true,
    });
    SwaggerModule.setup('swagger', app, document);

    app.connectMicroservice({
        transport: Transport.REDIS,
        options: {
            retryAttempts: 5,
            retryDelay: 3000,
            url: 'redis://localhost:6379',
        },
    });
    await app.startAllMicroservicesAsync();

    await app.listen(55555);
    Logger.log(`http://localhost:55555/swagger`);
    Logger.log(`http://localhost:55555/graphql`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
})();
