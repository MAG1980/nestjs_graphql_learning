import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as process from 'process';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { datasourceOptions } from './dataSource';
import { UserModule } from './user/user.module';

const { join } = path;

@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    UserSettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
