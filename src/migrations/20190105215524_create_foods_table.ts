import Knex from 'knex';
/**
 * Create table foods.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable('foods', table => {
    table.specificType('id', 'int(11) not null primary key auto_increment');
    table
      .integer('category_id')
      .references('id')
      .inTable('categories')
      .notNullable();
    table
      .string('name')
      .unique()
      .notNullable();
    table
      .string('type', 20)
      .notNullable()
      .defaultTo('plate')
      .comment('plate, bowl, glass');
    table.text('price').notNullable();
    table
      .boolean('is_veg')
      .defaultTo(0)
      .comment('0 or 1, 0 if false 1 if true');
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
 * Drop table foods.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable('foods');
}
