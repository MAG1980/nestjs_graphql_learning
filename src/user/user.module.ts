import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
  exports:[UserService]
})
export class UserModule {}
