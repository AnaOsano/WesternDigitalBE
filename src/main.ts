import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

const port = process.env.PORT || 3000;
console.log('port', process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });
}
bootstrap();
