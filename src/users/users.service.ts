import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/createuser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  // 名前重複の場合、Userスキーマで弾いている為、エラーになる
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  users: CreateUserDTO[] = [];
  async create(user: CreateUserDTO) {
    const createdUser = new this.userModel({
      username: user.username,
      password: user.password,
    });

    try {
      return await createdUser.save();
    } catch (error) {
      throw new HttpException('username is duplicated', 400);
    }
  }
  async findAll() {
    // userModelにアクセスすることで、DBの値を取得できるようにする
    return await this.userModel.find().exec();
  }

  async findOne(username: string) {
    // 存在しないデータはnullになる
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('存在しないユーザーです');
    }

    return user;
  }
}
