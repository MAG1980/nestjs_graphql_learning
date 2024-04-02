import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';

@Module({
  providers: [UserResolver],
})
export class UserModule {}
