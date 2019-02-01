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
    table.text('department').notNullable();
    table
      .boolean('is_office_blocked')
      .defaultTo(0)
      .comment('0 or 1, 0 is false and 1 is true');
    table.text('designation').notNullable();
    table.date('joining_date').notNullable();
    table
      .enu('employment_type', ['full-time', 'part-time'])
      .defaultTo('full-time')
      .notNullable();
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
