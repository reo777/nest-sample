import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // importsすることで、controller内のconstractorにDIされる
  //   ここだとprovidersにInjectされる
  imports: [
    UsersModule,
    JwtModule.register({
      // 本番はuuidなどを使う
      secret: 'secret',
      // jwt有効期限
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  // providersに書いたオブジェクトはインスタンス化(newされる)されるので他のserviceからでも使うことができる
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
