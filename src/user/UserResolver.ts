import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { mockUsers } from '../_mocks_/mockUsers';
import { UserSettings } from '../graphql/models/UserSettings';
import { mockUserSettings } from '../_mocks_/mockUserSettings';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { Inject } from '@nestjs/common';
import { UserService } from './user.service';

//Тип возвращаемого значения будет использоваться в качестве типа,
// возвращаемого вложенным декоратором @Parent()
@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  //name: 'userById' is the name of the query в схеме GraphQL
  @Query(() => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number): User {
    return mockUsers.find((user) => user.id === id);
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getUsers();
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
  // createUserData - название параметра, принимающего данные для создания пользователя в GraphQL-запросе
  createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserData);
  }
}
