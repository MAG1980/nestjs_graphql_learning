import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatasourceOptions } from './config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as process from 'process';
import { UserSettingsResolver } from './graphql/resolvers/UserSettingsResolver';
import { UserModule } from './user/user.module';

const { join } = path;

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...getDatasourceOptions() }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [UserSettingsResolver],
})
export class AppModule {}
