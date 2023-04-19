import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserById(id: number): Promise<User | null> {
    const user = this.usersService.findById(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async signIn(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      if (!user) {
        throw new UnauthorizedException();
      }

      const isValid = await bcrypt.compare(pass, user.password);
      if (!isValid) {
        throw new UnauthorizedException();
      }
      const { password, isAdmin, ...result } = user;

      const payload = { username: result.username, sub: result.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw e;
    }
  }
}
