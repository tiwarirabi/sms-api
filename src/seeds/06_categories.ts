import Knex from 'knex';
/**
 * Load initial seed data for categories.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('categories').insert([
    {
      name: 'Mo:Mo',
      display_picture: 'https://imgurl/i/123456',
      remarks: 'Mo:Mo is a delicious food.',
      created_by: 2
    },
    {
      name: 'Chowmein',
      display_picture: 'https://imgurl/i/123256',
      remarks: 'Chowmein is a delicious food.',
      created_by: 3
    }
  ]);
}
