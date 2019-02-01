import Knex from 'knex';
/**
 * Create table office_industries.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('office_industries', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('office_id')
      .references('id')
      .inTable('users_office')
      .notNullable();
    table
      .integer('industry_id')
      .references('id')
      .inTable('industries')
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
    table.unique(['office_id', 'industry_id']);
  });
}

/**
 * Drop table office_industries.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('office_industries');
}
