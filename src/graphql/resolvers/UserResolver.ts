import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from '../../_mocks_/mockUsers';

@Resolver()
export class UserResolver {
  //name: 'userById' is the name of the query в схеме GraphQL
  @Query(() => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number): User {
    return mockUsers.find((user) => user.id === id);
  }
}
