import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../models/interfaces/jwt.interfaces';
import { JWT_PRIVATE_KEY } from '../../../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: JwtStrategy.getJwtToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_PRIVATE_KEY,
      algorithms: [process.env.JWT_ALGORITHM || 'RS512'],
      issuer: process.env.JWT_ISSUER,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  static getJwtToken(): JwtFromRequestFunction {
    try {
      const jwt: JwtFromRequestFunction =
        ExtractJwt.fromAuthHeaderAsBearerToken();
      return jwt;
    } catch (e) {
      throw e;
    }
  }
}
