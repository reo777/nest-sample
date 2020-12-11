import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDTO } from '../users/dto/createuser.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  // controllerからDIしたものを初期化
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async validateUser({ username, password }: CreateUserDTO) {
    const user = await this.usersService.findOne(username);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('認証されていないユーザーです');
    }

    return isValid;
  }

  async login(user: CreateUserDTO) {
    if (await this.validateUser(user)) {
      const payload = { username: user.username };

      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
