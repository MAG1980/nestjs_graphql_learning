import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatasourceOptions } from './config';

@Module({
  imports: [TypeOrmModule.forRoot({ ...getDatasourceOptions() })],
  controllers: [],
  providers: [],
})
export class AppModule {}
