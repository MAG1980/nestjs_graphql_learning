import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { UserSettings } from "../graphql/models/UserSettings";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserSettingsInput } from "../graphql/utils/CreateUserSettingsInput";

@Injectable()
export class UserSettingsService {
  constructor(@InjectRepository(UserSettings) private userSettingsRepository:Repository<UserSettings>) {}

  getAllUserSettings():Promise<UserSettings[]>{
    return this.userSettingsRepository.find();
  }

  createUserSettings(createUserSettingsData:CreateUserSettingsInput):Promise<UserSettings>{
    const newUserSettings = this.userSettingsRepository.create(createUserSettingsData)
    return this.userSettingsRepository.save(newUserSettings)
  }

  getUserSettingsByUserId(userId:number):Promise<UserSettings>{
    return this.userSettingsRepository.findOneBy({userId})
  }
}
