import { DataSource, DataSourceOptions } from 'typeorm';
import { URL } from 'url';
import { config } from 'dotenv';
import * as process from 'process';

config();

const connectionString =
  process.env.NODE_ENV?.trim() === 'TEST'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const dbUrl = new URL(connectionString);
const routingId = dbUrl.searchParams.get('options');
dbUrl.searchParams.delete('options');

console.log(dbUrl.toString());
export const datasourceOptions: DataSourceOptions = {
  type: 'cockroachdb',
  url: dbUrl.toString(),
  ssl: true,
  extra: {
    options: routingId,
  },
  timeTravelQueries: false,
  entities: [__dirname + '/../graphql/models/*{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
  // logging:true
};

export default new DataSource(datasourceOptions);
