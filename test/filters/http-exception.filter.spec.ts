import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../src/filters/http-exception.filter';
import { createMock } from '@golevelup/nestjs-testing';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should handle HttpException for HTTP request', () => {
    const httpException = new HttpException('Test error', HttpStatus.BAD_REQUEST);
  
    const request = {
      method: 'GET',
      url: '/test'
    } as unknown as Request;
  
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
  
    const argsHost = createMock<ArgumentsHost>({
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response
      }),
      getType: () => 'http'
    });
  
    filter.catch(httpException, argsHost);
  
    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith({
      metadata: {
        statusCode: HttpStatus.BAD_REQUEST,
        status: 'error',
        timestamp: expect.any(String),
        path: '/test',
        message: 'Test error'
      }
    });
  });
  
});
