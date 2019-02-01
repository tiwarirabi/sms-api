import Knex from 'knex';
/**
 * Create table users_employee.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('users_employee', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('user_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('users');
    table
      .integer('office_id')
      .notNullable()
      .references('id')
      .inTable('users_office');
    table.text('department').notNullable();
    table
      .boolean('is_admin_blocked')
      .defaultTo(0)
      .comment('0 or 1, 0 is false and 1 is true');
    table
      .boolean('is_office_blocked')
      .defaultTo(0)
      .comment('0 or 1, 0 is false and 1 is true');
    table.text('designation').notNullable();
    table.date('birth_date').notNullable();
    table
      .string('gender', 6)
      .notNullable()
      .comment('male, female, other');
    table.text('identification_document_picture');
    table.boolean('is_veg').notNullable();
    table.date('joining_date').notNullable();
    table
      .text('employment_type')
      .notNullable()
      .comment('full-time, part-time');
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
  return knex.schema.dropTable('users_employee');
}
