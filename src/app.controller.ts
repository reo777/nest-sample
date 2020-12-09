import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// contorollerはルーティングの責務を持つ
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
