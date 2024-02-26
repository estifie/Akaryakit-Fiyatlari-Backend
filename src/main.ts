import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const version = process.env.VERSION || 'v1';

  app.setGlobalPrefix(`api/${version}`);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
