import Knex from 'knex';
/**
 * Create table <table_name>.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('emplo', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('employee_id')
      .references('id')
      .inTable('users_employee')
      .notNullable();
    table
      .integer('office_id')
      .references('id')
      .inTable('users_office')
      .notNullable();
    table.text('department').notNullable();
    table.boolean('is_office_blocked').defaultTo(0).comment('0 or 1, 0 is false and 1 is true');
    table.text('designation').notNullable();
    table.date('joining_date').notNullable();
    table
      .enu('employment_type', ['full-time','part-time'])
      .defaultTo('full-time')
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
    table.unique(['office_id','employee_id']);
  });
}

/**
 * Drop table <table_name>.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('table_name');
}
