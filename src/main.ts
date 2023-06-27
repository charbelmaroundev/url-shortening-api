import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const port = process.env.SERVER_PORT;

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Shortening Service')
    .setDescription('URL Shortening Service with Monitoring and Docker')
    .setVersion('1.0.0')
    .addTag('Auth')
    .addTag('Url')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
  console.info(`SERVER IS RUNNING ON PORT: ${port}`);
})();
