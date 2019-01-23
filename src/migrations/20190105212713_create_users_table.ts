import Knex from 'knex';
/**
 * Create table users.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .string('email')
      .notNullable()
      .unique();
    table.text('password').notNullable();
    table
      .string('type', 10)
      .defaultTo('employee')
      .comment('admin, office, employee')
      .notNullable();
    table.text('first_name').notNullable();
    table.text('middle_name');
    table.text('last_name').notNullable();
    table.string('mobile', 20).unique();
    table.string('email_verification_code', 10);
    table.string('mobile_verification_code', 10);
    table.text('display_picture');
    table.dateTime('last_logged_in');
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
 * Drop table users.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
