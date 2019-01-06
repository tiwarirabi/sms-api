import Knex from 'knex';
/**
 * Create table attendance.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('attendance', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('employee_id')
      .references('id')
      .inTable('users_employee')
      .notNullable();
    table.boolean('office_verified');
    table.dateTime('date');
    table.text('remarks');
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
 * Drop table attendance.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('attendance');
}
