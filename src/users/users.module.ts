import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  // MongooseModuleをimportすることで、controllersやprovidersにモデルがInjectされる
  // controllers,providersにDIする
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  // providersを外部から呼ばれた時、injectされるようにexportsする
  exports: [UsersService],
})
export class UsersModule {}
