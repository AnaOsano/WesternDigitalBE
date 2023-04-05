import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import * as session from 'express-session'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

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

  /**
   * Middleware for Express that provides session management
   * It enables you to store user-specific data on the server-side, and associate it with a session ID
   * 'my-secret' secret is used to sign the session ID cookie and ensure its integrity.
   */
  global.app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  /**
     * Conditionally configuring and setting up the Swagger documentation based on the current environment. 
     * Swagger (now known as OpenAPI) is a widely used API documentation and testing framework that helps developers and consumers understand and interact with APIs.
     */
  if (
    ['development', 'local', 'uat'].some(
      (env) =>
        process.env.APP_ENV &&
        env.toUpperCase() === process.env.APP_ENV.toUpperCase(),
    )
  ) {
    /**
     * Initializes a new DocumentBuilder instance, which is used to configure the Swagger documentation's properties, such as title, description, version, and tags. 
     * It also adds Bearer authentication support.
     */
    const documentBuilder: DocumentBuilder = new DocumentBuilder()
      .setTitle('Altimetrik NodeJS Base')
      .setDescription('')
      .setVersion('1.0')
      .addTag('altimetrik')
      .addBearerAuth();
    
    /**
     * Creates a Swagger document using the documentBuilder configuration and the application instance (global.app).
     * The document is an OpenAPIObject, which represents the structure of your API documentation.
     */
    const document: OpenAPIObject = SwaggerModule.createDocument(
      global.app,
      documentBuilder.build(),
    );

    /**
     * Sets up the Swagger documentation in the app by configuring the path where the documentation will be accessible (in this case, /api-doc).
     * Associates the docs with the app instance (global.app) and the Swagger document (document) created earlier.
     */
    SwaggerModule.setup('api-doc', global.app, document);
  }

  await app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });
}
bootstrap();
