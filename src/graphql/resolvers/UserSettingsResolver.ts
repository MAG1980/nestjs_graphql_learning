import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSettings } from '../models/UserSettings';
import { CreateUserSettingsInput } from '../utils/CreateUserSettingsInput';
import { Inject } from "@nestjs/common";
import { UserSettingsService } from "../../user-settings/user-settings.service";

@Resolver(() => UserSettings)
export class UserSettingsResolver {
  constructor(@Inject(UserSettingsService) private userSettingsService: UserSettingsService) {}
  @Mutation(() => UserSettings, { nullable: true })
  createUserSettings(
    @Args({ name: 'createUserSettingsData' })
    createUserSettingsData: CreateUserSettingsInput,
  ): Promise<UserSettings> {
    return this.userSettingsService.createUserSettings(createUserSettingsData)
  }

  @Query(() => [UserSettings])
  getAllUserSettings(): Promise<UserSettings[]> {
    return this.userSettingsService.getAllUserSettings()
  }

  @Query(()=>UserSettings)
  getUserSettingsByUserId(@Args('userId',{type:()=>Int}) userId:number):Promise<UserSettings>{
    return this.userSettingsService.getUserSettingsByUserId(userId)
  }
}
