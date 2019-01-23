import Knex from 'knex';
/**
 * Load initial seed data for users_employee.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('users_employee').insert([
    {
      user_id: 7,
      birth_date: '1992-03-04',
      is_veg: 0,
      created_by: 5
    },
    {
      user_id: 8,
      birth_date: '1994-03-04',
      is_veg: 1,
      created_by: 5
    },
    {
      user_id: 9,
      birth_date: '1990-03-04',
      is_veg: 0,
      created_by: 6
    }
  ]);
}
