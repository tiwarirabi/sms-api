import Knex from 'knex';
/**
 * Create table users.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('type');
    table
      .enu('type', ['employee','office', 'admin'])
      .defaultTo('employee')
      .notNullable();
    table.enu('gender', ['male','female', 'other']);
  });
}

/**
 * Drop table users.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
