import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { setupCors } from './middleware/setupCors';
import { setupSwagger } from './middleware/setupSwagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/',
  });
  setupCors(app);
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
