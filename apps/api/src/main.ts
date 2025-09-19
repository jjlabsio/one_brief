import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'warn', 'error'],
  });

  const configService = app.get(ConfigService);
  const corsOrigin = configService.get('CORS_ORIGIN');

  app.enableCors({
    origin: [corsOrigin],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}
void bootstrap();
