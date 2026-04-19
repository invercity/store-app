import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Inventory Management')
        .setDescription('Inventory management API description')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}
bootstrap();
