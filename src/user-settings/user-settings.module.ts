import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSettings } from "../graphql/models/UserSettings";
import { UserSettingsResolver } from "../graphql/resolvers/UserSettingsResolver";
import { UserSettingsService } from './user-settings.service';
import { UserModule } from "../user/user.module";

@Module({
  imports:[TypeOrmModule.forFeature([UserSettings]), UserModule],
  providers: [UserSettingsResolver, UserSettingsService],
})
export class UserSettingsModule {}
