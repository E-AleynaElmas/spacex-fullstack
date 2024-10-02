// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const ENABLE_SWAGGER = process.env.ENABLE_SWAGGER === 'true';

  if (ENABLE_SWAGGER) {
    const config = new DocumentBuilder()
      .setTitle('SPACEX API Documentation')
      .setDescription('SPACEX API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    console.log('Swagger documentation enabled: /api');
  } else {
    console.log('Swagger documentation has been disabled.');
  }

  await app.listen(3000);
  console.log(`The application runs at ${await app.getUrl()}`);
}
bootstrap();
