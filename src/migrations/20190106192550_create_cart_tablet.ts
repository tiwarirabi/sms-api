import Knex from 'knex';
/**
 * Create table cart.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('cart', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('attendance_id')
      .references('id')
      .inTable('attendance')
      .notNullable();
    table
      .integer('food_id')
      .references('id')
      .inTable('foods')
      .notNullable();
    table.integer('quantity').notNullable();
    table
      .integer('created_by')
      .references('id')
      .inTable('users')
      .notNullable();
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    table
      .integer('updated_by')
      .references('id')
      .inTable('users');
    table.dateTime('updated_at');
  });
}

/**
 * Drop table cart.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('cart');
}
