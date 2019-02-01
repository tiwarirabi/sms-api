import Knex from 'knex';
/**
 * Create table users_employee.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.alterTable('users_employee', table => {
    table.dropForeign(['office_id']);
    table.dropColumn('office_id');
    table.dropColumn('gender');
    table.dropColumn('department');
    table.dropColumn('is_office_blocked');
    table.dropColumn('designation');
    table.dropColumn('joining_date');
    table.dropColumn('employment_type');
  });
}

/**
 * Drop table users_employee.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  // return knex.schema.dropTable('users_employee');
}
