import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Algorithm } from 'jsonwebtoken';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } from '../../config/jwt.config';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: AuthModule,
      imports: [
        PassportModule.register({
          defaultStrategy: process.env.AUTH_STRATEGY || 'jwt',
        }),
        JwtModule.register({
          privateKey: JWT_PRIVATE_KEY || 'S3cr3T',
          publicKey: JWT_PUBLIC_KEY || 'P8bl1C',
          signOptions: {
            expiresIn: process.env.JWT_TOKEN_TTL || 3600,
            issuer: process.env.JWT_ISSUER || 'example.com',
            algorithm: (process.env.JWT_ALGORITHM ||
              'RS512') as unknown as Algorithm,
          },
          verifyOptions: {
            algorithms: ['RS512', 'HS256', 'RS256'],
          },
        }),
        UsersModule,
      ],
      providers: [AuthService, AuthGuard, JwtStrategy],
      controllers: [AuthController],
      exports: [AuthService, AuthGuard, JwtStrategy, JwtModule],
    };
  }
}
