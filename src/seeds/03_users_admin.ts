import Knex from 'knex';
/**
 * Load initial seed data for users_admin.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('users_admin').insert([
    {
      user_id: 1,
      role: 'all',
      created_by: 1
    },
    {
      user_id: 2,
      role: 'all',
      created_by: 1
    },
    {
      user_id: 3,
      role: 'all',
      created_by: 2
    },
    {
      user_id: 4,
      role: 'all',
      created_by: 1
    }
  ]);
}
