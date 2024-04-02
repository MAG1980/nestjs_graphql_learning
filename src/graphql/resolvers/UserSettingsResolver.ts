import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSettings } from '../models/UserSettings';
import { mockUserSettings } from '../../_mocks_/mockUserSettings';
import { CreateUserSettingsInput } from '../utils/CreateUserSettingsInput';

@Resolver(() => UserSettings)
export class UserSettingsResolver {
  @Mutation(() => UserSettings, { nullable: true })
  createUserSettings(
    @Args({ name: 'createUserSettingsData' })
    createUserSettingsData: CreateUserSettingsInput,
  ): UserSettings {
    const id = mockUserSettings[mockUserSettings.length - 1].id + 1;
    const { userId, receiveNotifications, receiveEmails } =
      createUserSettingsData;
    const newUserSettings = { id, userId, receiveNotifications, receiveEmails };
    mockUserSettings.push(newUserSettings);
    return newUserSettings;
  }

  @Query(() => [UserSettings])
  getAllUserSettings(): UserSettings[] {
    return mockUserSettings;
  }
}
