import Knex from 'knex';

import * as db from '../utils/db';

const TOKEN_TABLE = 'token';

export async function fetch(dbToken: any, tx?: Knex) {
  return db
    .connection(tx)(TOKEN_TABLE)
    .select()
    .where(dbToken);
}

/**
 * Save the refresh token in the database.
 *
 * @param {string} token
 * @param {number} userId
 */
export async function save(dbToken: any, tx?: Knex) {
  return db
    .connection(tx)(TOKEN_TABLE)
    .insert({
      ...dbToken,
      hasExpired: 0
    });
}
