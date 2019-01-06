import Knex from 'knex';
/**
 * Create table orders.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('orders', table => {
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
      .integer('delivery_user')
      .references('id')
      .inTable('users_admin')
      .notNullable();
    table
      .enu('status', ['order_placed','on_queue','preparing','prepared','packing','packed','shipping','delivered'])
      .defaultTo('order_placed')
      .notNullable();
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
 * Drop table orders.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('orders');
}
