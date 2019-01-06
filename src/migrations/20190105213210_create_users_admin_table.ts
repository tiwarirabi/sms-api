import Knex from 'knex';
/**
 * Create table users_admin.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('users_admin', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('user_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('users');
    table
      .enu('role', ['all','accountant','receptionist','waiter','kitchen','hr','delivery_user'])
      .defaultTo('all')
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
 * Drop table users_admin.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('users_admin');
}
