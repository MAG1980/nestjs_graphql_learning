import { URL } from 'url';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const dbUrl = new URL(process.env.DATABASE_URL);
const routingId = dbUrl.searchParams.get('options');
dbUrl.searchParams.delete('options');

export const getDatasourceOptions = (): DataSourceOptions => {
  console.log(dbUrl.toString());
  return {
    type: 'cockroachdb',
    url: dbUrl.toString(),
    ssl: true,
    extra: {
      options: routingId,
    },

    timeTravelQueries: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
  };
};
