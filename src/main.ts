import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { playgroundMiddleware } from './middlewares/playground-middleware';
import { ApiPath } from './helpers/api-version.helper';
import { HttpExceptionFilter } from './filters/http-exception.filter';

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
    ['development', 'local', 'uat', 'test'].some(
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

  /**
   * @description Serves the GraphQL Playground at the specified routes.
   */
  global.app.use(
  /**
   * @description It should be able to access the GraphQL Playground at the specified routes (e.g., http://localhost:{PORT}/v1/western-digitals/graphql 
   */
    playgroundMiddleware({ gigzter: process.env.GRAPHQL_PLAYGROUND_PASS }, [
      ApiPath('western-digitals/graphql'),
    ]),
  );

  /**
   * @description Registers a global filter named HttpExceptionFilter that handles exceptions thrown within in the app.
   */
    global.app.useGlobalFilters(new HttpExceptionFilter());

    /**
     * @description registers a global validation pipe that validates and transforms incoming request data based on DTO classes.
     */
    global.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
  
  await app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });
}
bootstrap();
