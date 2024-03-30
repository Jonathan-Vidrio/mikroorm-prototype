import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
