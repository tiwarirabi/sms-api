import Knex from 'knex';
/**
 * Create table office_industries.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('token', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable();
    table.text('token').notNullable();
    table
      .boolean('has_expired')
      .notNullable()
      .defaultTo(0);
    table.string('device').notNullable();
    table
      .dateTime('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
  });
}

/**
 * Drop table office_industries.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('token');
}
