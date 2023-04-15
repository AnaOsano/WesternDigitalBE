import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = global.logger(HttpExceptionFilter.name);

  /**
   * @description Main method that handles the caught exception. The host.getType() method is used to determine the type of request being processed (HTTP, RPC, or GraphQL). 
   * @param exception Caught exception
   * @param host {ArgumentsHost} Which provides information about the current execution context.
   * @returns 
   */
  catch(exception: HttpException, host: ArgumentsHost): Error {
    /**
     * For HTTP requests
     */
    if (host.getType() === 'http') {
      const ctx: HttpArgumentsHost = host.switchToHttp();
      const response: Response = ctx.getResponse<Response>();
      const request: Request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      this.logger.error(
        `${exception.message}`,
        `${request.method}(${request.ip}) -> ${
          request.hostname || request.host
        }${request.originalUrl}`,
      );
      /**
       * The filter formats the error response as a JSON object with metadata containing the status code, timestamp, path, and error message.
       */
      if (request.path !== '/json') {
        response.status(status || 500).json({
          metadata: {
            statusCode: status,
            status: 'error',
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message
          }
        });
      }
      /**
       * The filter returns a new HttpException instance with the original message and status.
       */
      return new HttpException(exception.message, status || 500);
    } else
    /** 
     * For microservices (RPC) requests
    */
    if (host.getType() === 'rpc') {
      // TODO: something that is only important in the context of Microservice requests
    } else 
    /**
     * For GraphQL requests
     */
    if (host.getType<GqlContextType>() === 'graphql') {
      /**
       * Extracts additional information from the GraphQL context (e.g., typename and key) and logs the exception message along with some request details.
       */
      const gqlHost: GqlArgumentsHost = GqlArgumentsHost.create(host);
      const ctx: HttpArgumentsHost = gqlHost.switchToHttp();
      const request: Request = ctx.getRequest<Request>() || ctx.getNext().req;
      const status = exception.getStatus();
      const data = ((gqlHost as any).args || [])[3];
      /**
       * Removes the stack trace information from the exception.
       */
      exception.stack = null;
      exception['stacktrace'] = null;
      let logContext = `${request.method}(${request.ip}) -> ${
        request.hostname || request.host
      }${request.originalUrl}`;
      if (data && data.path) {
        const { key, typename } = data.path;
        logContext = `${typename}(${request.ip}) -> ${
          request.hostname || request.host
        }${request.originalUrl}/${key}`;
      }
      const message = exception['response']?.message
        ? typeof exception['response']?.message === 'object' &&
          exception['response']?.message.hasOwnProperty('length')
          ? exception['response']?.message.join('./n')
          : exception['response']?.message
        : exception.message;
      this.logger.error(`${message}`, exception.stack, logContext);
      /**
       * Returns a new HttpException instance with the modified message and status.
       */
      return new HttpException(message, status || 500);
    }
  }
}

