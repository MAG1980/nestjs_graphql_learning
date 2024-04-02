import { Module } from '@nestjs/common';
import { UserResolver } from '../graphql/resolvers/UserResolver';

@Module({
  providers: [UserResolver],
})
export class UserModule {}
