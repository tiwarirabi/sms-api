import Knex from 'knex';

import knex from './knex';

/**
 * Returns parent transaction or new knex instance.
 *
 * @param {knex} tx
 * @returns {knex}
 */
export function connection(tx?: Knex) {
  return tx || knex;
}

/**
 * Start knex transaction.
 * If tx is null then it will start new transaction else it will return tx.
 *
 * @param {Knex} tx
 * @param {any} func
 * @returns {knex<Transaction>}
 */
export function transaction(tx: Knex, func: any) {
  if (tx) {
    try {
      return func(tx);
    } catch (error) {
      throw error;
    }
  }

  return knex.transaction(trx => {
    try {
      return func(trx);
    } catch (error) {
      throw error;
    }
  });
}

/**
 * Execute raw query.
 *
 * @param {string} sql
 * @param {object} params
 * @param {knex} tx
 * @returns {[] || object}
 */
export async function raw(sql: string, params: object, tx?: Knex) {
  return connection(tx)
    .raw(sql, { ...params })
    .then(([result]) => result);
}

/**
 * Fetch data filtered by params.
 *
 * @param {string} table
 * @param {object} params
 * @param {knex} tx
 * @returns {Promise}
 */
export function fetch(table: string, params: object, tx: Knex) {
  return connection(tx)
    .from(table)
    .where(params);
}

/**
 * Insert data.
 *
 * @param {string} table
 * @param {object} data
 * @param {string} returning
 * @param {knex} tx
 * @returns {Array<t>}
 */
export function insert(
  table: string,
  data: object,
  returning: string,
  tx: Knex
) {
  return connection(tx)
    .insert(data)
    .returning(returning)
    .into(table);
}

/**
 * Update data.
 *
 * @param {string} table
 * @param {object} params
 * @param {object} data
 * @param {knex} tx
 * @returns {Promise}
 */
export function update(table: string, params: object, data: object, tx: Knex) {
  return connection(tx)
    .table(table)
    .where(params)
    .update(data);
}

/**
 * Batch insert data.
 *
 * @param {String} table
 * @param {Array<T>} data
 * @param {Object} tx
 * @returns {Promise}
 */
export function batchInsert(
  table: string,
  data: object[],
  tx: Knex.Transaction
) {
  return knex.batchInsert(table, data).transacting(tx);
}

/**
 * Batch Update.
 *
 * @param {string} table
 * @param {Array<t>} collection
 * @param {any} options
 * @param {knex} tx
 * @returns {Promise}
 */
export function batchUpdate(
  table: string,
  collection: any[],
  options: any,
  tx: Knex.Transaction
) {
  return transaction(tx, (trx: Knex.Transaction) => {
    const queries = collection.map(tuple =>
      trx(table)
        .where(options.column, tuple[options.column])
        .update(tuple)
    );

    return Promise.all(queries);
  });
}

/**
 * Batch Delete.
 *
 * @param {string} table
 * @param {Array} collection
 * @param {object} options
 * @param {Knex} tx
 * @returns {Promise}
 */
export function batchDelete(
  table: string,
  collection: any[],
  options: any,
  tx: Knex.Transaction
) {
  return transaction(tx, (trx: Knex.Transaction) => {
    const queries = collection.map(tuple =>
      trx(table)
        .where(options.column, tuple[options.column])
        .del()
    );

    return Promise.all(queries);
  });
}

/**
 * Remove data.
 *
 * @param {string} table
 * @param {object} params
 * @param {knex} tx
 * @returns {Promise}
 */
export function remove(table: string, params: object, tx: Knex) {
  return connection(tx)
    .table(table)
    .where(params)
    .del();
}
