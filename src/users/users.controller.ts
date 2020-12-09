import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
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
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDTO) {
    return this.usersService.create(createUser);
  }
}
