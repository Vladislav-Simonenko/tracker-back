import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { setupCors } from './middleware/setupCors';
import { setupSwagger } from './middleware/setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupCors(app);
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
