import { Injectable } from '@nestjs/common';
// serviceはどういった処理をするかの責務を持つ
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
