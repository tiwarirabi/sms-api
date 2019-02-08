import config from './config/config';
const knexConfig = {
  ...config.database,

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

module.exports = knexConfig;
