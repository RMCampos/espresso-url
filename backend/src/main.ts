import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

  const allowedOrigins = ['http://localhost:5173'];

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // If true, it strips properties that do not have any validation decorators
      whitelist: true,
      // If true, it throws an error if the client sends non-whitelisted properties
      forbidNonWhitelisted: true,
      // Automatically converts types (e.g., a string "5" to a number 5)
      transform: true,
    }),
  );

  await app
    .listen(process.env.PORT ?? 3000, '0.0.0.0')
    .catch(console.error);
}
void bootstrap();
