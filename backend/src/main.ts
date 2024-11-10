import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type',
  });

  // Use PORT from .env or default to 5000
  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
