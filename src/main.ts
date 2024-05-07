import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import * as fs from 'fs';
import { AppModule } from './app.module';
config();

async function bootstrap() {
  const httpsOptions =
    process.env.HTTPS_ENABLED === 'true'
      ? {
          key: fs.readFileSync(process.env.HTTPS_KEY_PATH),
          cert: fs.readFileSync(process.env.HTTPS_CERT_PATH),
        }
      : null;

  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    logger: ['error', 'warn', 'log', 'debug'],
    httpsOptions,
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const version = process.env.VERSION || 'v1';

  app.setGlobalPrefix(`api/${version}`);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
