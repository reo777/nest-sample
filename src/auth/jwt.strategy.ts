import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 認証ヘッダーにbearerTokenを持たせる
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // トークンの期限切れをエラーにする
      ignoreExpiration: false,
      // jwtのシークレットキーと同じにする
      secretOrKey: 'secret',
    });
  }
  // 必ず書く必要がある
  // jwtを複合化した時にできるpayload
  async validate(payload: JWTPayload) {
    // UseGuard
    // @UseGuardsの@Requestを使ってデータのアクセスを行っているところにpayloadが　返される
    return payload;
  }
}
