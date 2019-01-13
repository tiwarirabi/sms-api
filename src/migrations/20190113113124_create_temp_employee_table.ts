import Knex from 'knex';
/**
 * Create table temp_employee.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('temp_employee', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('office_id')
      .notNullable()
      .references('id')
      .inTable('users_office');
    table.string('email').notNullable();
    table.text('key').notNullable();
  });
}

/**
 * Drop table temp_employee.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('temp_employee');
}
