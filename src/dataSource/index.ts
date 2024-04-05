import { DataSource, DataSourceOptions } from 'typeorm';
import { URL } from 'url';
import { config } from 'dotenv';

config();

const dbUrl = new URL(process.env.DATABASE_URL);
const routingId = dbUrl.searchParams.get('options');
dbUrl.searchParams.delete('options');

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
