import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      app: any;
      hbs: any;
      _logger: Logger;
      logger: (name?: string) => Logger;
    }
  }


const port = process.env.PORT || 3000;
console.log('port', process.env.PORT);
async function bootstrap() {
  
  /**
   * Defines a function global.logger, which is accessible from anywhere by creating and retrieving Logger instance.
   * The Logger class is typically used for logging messages, errors, or other information to various output streams, such as the console or a log file.
   * @param name Used to customize the logger instance.
   * @returns new Logger(name) Logger instance with the given name (if provided).
   */
  global.logger = (name?: string) => {
    if (global._logger) {
      return global._logger;
    }
    return new Logger(name);
  };
  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });
}
bootstrap();
