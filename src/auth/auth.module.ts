import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  // importsすることで、controller内のconstractorにDIされる
  imports: [
    JwtModule.register({
      // 本番はuuidなどを使う
      secret: 'secret',
      // jwt有効期限
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
