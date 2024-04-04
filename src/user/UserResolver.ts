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
import { UserSettings } from '../graphql/models/UserSettings';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';
import { Inject, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSettingsService } from "../user-settings/user-settings.service";
import { ModuleRef } from "@nestjs/core";

//Тип возвращаемого значения будет использоваться в качестве типа,
// возвращаемого вложенным декоратором @Parent()
@Resolver(() => User)
export class UserResolver implements OnModuleInit {
  private userSettingsService: UserSettingsService

  constructor(
    @Inject(UserService) private userService: UserService,
    private moduleRef: ModuleRef
  ) {}

  onModuleInit() {
    this.userSettingsService = this.moduleRef.get(UserSettingsService, { strict: false });
  }

  //name: 'userById' is the name of the query в схеме GraphQL
  @Query(() => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUserById(id)
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
    return this.userSettingsService.getUserSettingsByUserId(user.id)
  }

  @Mutation(() => User)
  // createUserData - название параметра, принимающего данные для создания пользователя в GraphQL-запросе
  createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserData);
  }
}
