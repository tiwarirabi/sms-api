import Knex from 'knex';
/**
 * Load initial seed data for office_industries.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('office_industries').insert([
    {
        office_id: 1,
        industry_id:4,
        created_by: 3,
    },
    {
        office_id: 2,
        industry_id:1,
        created_by: 4,
    },
    {
        office_id: 2,
        industry_id:3,
        created_by: 4,
    },
  ]);
}
