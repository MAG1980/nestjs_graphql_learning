import { DataSource } from 'typeorm';
import { getDatasourceOptions } from '../config';

export const AppDataSource = new DataSource({
  ...getDatasourceOptions(),
});
