import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from '../../_mocks_/mockUsers';
import { UserSettings } from '../models/UserSettings';
import { mockUserSettings } from '../../_mocks_/mockUserSettings';

//Тип возвращаемого значения будет использоваться в качестве типа,
// возвращаемого вложенным декоратором @Parent()
@Resolver(() => User)
export class UserResolver {
  //name: 'userById' is the name of the query в схеме GraphQL
  @Query(() => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number): User {
    return mockUsers.find((user) => user.id === id);
  }

  @Query(() => [User])
  getAllUsers(): User[] {
    return mockUsers;
  }

  //Если не передать в @ResolveField вторым параметром { name },
  // то NestJS автоматически добавит в type User GraphQL-схемы свойство с названием метода.
  //Благодаря тому, что в { name } указано название свойства,
  // присутствующего в модели User (в данном случае - settings),
  // при обращении к этом свойству будет вызываться getUserSettings.
  // { nullable: true } позволяет возвращать null в случае отсутствия свойства в модели.
  //При работе с реляционными БД (SQL) применять @ResolveField не следует,
  //т.к. это приводит к увеличению количества запросов к базе данных (снижению производительности).
  //Вместо этого при написании @Query следует извлекать из БД все необходимые свойства в одном запросе.
  @ResolveField(() => UserSettings, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    console.log(user);
    return mockUserSettings.find((settings) => settings.userId === user.id);
  }

  @Mutation(() => User)
  createUser(
    @Args('username') username: string,
    @Args('displayName', { nullable: true }) displayName: string,
  ): User {
    const id = mockUsers.length + 1;
    const newUser = { id, username, displayName };
    mockUsers.push(newUser);
    return newUser;
  }
}
