import Knex from 'knex';
/**
 * Load initial seed data for foods.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('foods').insert([
    {
      category_id: 1,
      name: 'Chicken Mo:Mo',
      type: 'plate',
      price: '100',
      is_veg: 0,
      remarks: 'Chicken Mo:Mo is a delicious food.',
      created_by: 2
    },
    {
      category_id: 1,
      name: 'Buff Mo:Mo',
      type: 'plate',
      price: '80',
      is_veg: 0,
      remarks: 'Buff Mo:Mo is a delicious food.',
      created_by: 2
    },
    {
      category_id: 1,
      name: 'Veg Mo:Mo',
      type: 'plate',
      price: '70',
      is_veg: 1,
      remarks: 'Veg. Mo:Mo is a delicious food.',
      created_by: 2
    },
    {
      category_id: 2,
      name: 'Chicken Chowmein',
      type: 'plate',
      price: '100',
      is_veg: 0,
      remarks: 'Chicken Chowmein is a delicious food.',
      created_by: 2
    },
    {
      category_id: 2,
      name: 'Buff. Chowmein',
      type: 'plate',
      price: '80',
      is_veg: 0,
      remarks: 'Buff. Chowmein is a delicious food.',
      created_by: 2
    },
    {
      category_id: 2,
      name: 'Veg. Chowmein',
      type: 'plate',
      price: '100',
      is_veg: 1,
      remarks: 'Veg. Chowmein is a delicious food.',
      created_by: 2
    }
  ]);
}
