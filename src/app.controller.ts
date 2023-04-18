import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService = appService;
  }

  @Get()
  getHello(@Res() res: Response) {
    return res.status(200).json({
      message: this.appService.getHello()
    });
  }
}
