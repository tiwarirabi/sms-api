import * as knex from 'knex';
import config from '../config/config';
import { toCamelCase, toSnakeCase } from '../utils/object';

const kConfig = {
  ...config.database,

  postProcessResponse: (result: any) => {
    if (Array.isArray(result)) {
      return result.map(row => toCamelCase(row));
    }

    return toCamelCase(result);
  },

  wrapIdentifier: (value: string, origImpl: any) => origImpl(toSnakeCase(value))
};

export default knex(kConfig);
