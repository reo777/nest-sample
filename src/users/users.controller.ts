import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './dto/createuser.dto';
import { UsersService } from './users.service';

// エンドポイント
// /usersになる
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  // クエリ
  @Get(':username')

  // @nest/passportはjwt以外のストラテジーがあるので、明示的にjwtにする
  // jwtの解析は@nestjs/passportがやってくれる
  // 認証後のユーザーのみfindOneを叩けるようにjwtの解析を行う
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('username') username: string, @Request() req: any) {
    // ここのuserはjwt.strategyでreturnされているpayload
    console.log(req.user);

    return this.usersService.findOne(username);
  }

  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDTO) {
    return this.usersService.create(createUser);
  }

  @Put(':username')
  updateName(@Param('username') targetUserName: string, nextUserName: string) {
    return this.usersService.updateName(targetUserName, nextUserName);
  }
}
