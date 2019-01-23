import config from './config/config';
import { toCamelCase, toSnakeCase } from './utils/object';

export const knexConfig = {
  ...config.database,
  postProcessResponse: (result: any) => {
    if (Array.isArray(result)) {
      return result.map(row => toCamelCase(row));
    }

    return toCamelCase(result);
  },
  wrapIdentifier: (value: string, origImpl: any) =>
    origImpl(toSnakeCase(value)),
  migrations: {
    tableName: 'migration_mvp',
    directory: './src/migrations',
    stub: './src/stubs/migration.stub',
    extensions: ['ts']
  },
  seeds: {
    directory: './src/seeds',
    stub: './src/stubs/seed.stub'
  }
};
