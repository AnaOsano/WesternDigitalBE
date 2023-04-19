import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiPath } from '../../../helpers/api-version.helper';

@Controller(ApiPath('auth'))
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
