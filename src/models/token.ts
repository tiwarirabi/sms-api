import Knex from 'knex';

import * as db from '../utils/db';

const TOKEN_TABLE = 'token';

/**
 * Save the refresh token in the database.
 *
 * @param {string} token
 * @param {number} userId
 */
export async function save(token: string, userId: number, tx?: Knex) {
  return db
    .connection(tx)(TOKEN_TABLE)
    .insert({
      token,
      userId,
      hasExpired: 0,
      device: 'default test devic'
    });
}
