import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../users/dto/createuser.dto';

@Injectable()
export class AuthService {
  // controllerからDIしたものを初期化
  constructor(private readonly jwtService: JwtService) {}
  async login(user: CreateUserDTO) {
    const payload = { username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
