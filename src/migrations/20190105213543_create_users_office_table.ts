import Knex from 'knex';
/**
 * Create table users_office.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('users_office', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('user_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('users');
    table
      .string('name')
      .unique()
      .notNullable();
    table.text('location').notNullable();
    table.text('location_gps');
    table.integer('no_of_employees').notNullable();
    table.integer('max_budget').notNullable();
    table.string('phone', 20).notNullable();
    table.text('delivery_time');
    table.text('pan_no').notNullable();
    table.text('regd_no').notNullable();
    table.text('remarks');
    table
      .boolean('is_verified')
      .defaultTo(0)
      .comment('0 or 1, 0 if false, 1 if true');
    table
      .integer('verified_by')
      .references('id')
      .inTable('users');
    table.dateTime('verified_at');
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
 * Drop table users_employee.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('users_office');
}
