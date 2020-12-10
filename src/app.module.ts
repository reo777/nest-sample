import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// modulesは外部とのやりとりのみに責務を持つ

// .modulesをインスタンス化してServiceやControllerを使えるようにする
// providersの中にあるものしかexportsできない
// importsしたものはexportsできない
// exportsされたものをimportした場合、controllersにDIされる

// デコレーター
@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://reo777:ztnOcY2yl6d04tNz@cluster0.w5kln.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
