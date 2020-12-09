import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('request...');
    // middlewareの関数
    // ミドルウェアの処理実行後に呼び出される
    // next()を呼び出さない限り、リクエストがぶら下がったままになる
    next();
  }
}
