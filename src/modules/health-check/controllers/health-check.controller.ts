import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiPath } from '../../../helpers/api-version.helper';

@Controller(ApiPath('health-check'))
export class HealthCheckController {
  @Get()
  healthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).send('OK');
  }
}