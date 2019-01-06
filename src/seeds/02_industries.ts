import Knex from 'knex';
/**
 * Load initial seed data for industries.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('industries').insert([
    {
        name: "Educational Consultancy",
        remarks: "Educational Consultancy which deals with immigration and international education.",
        created_by: 2,
    },
    {
        name: "Manpower",
        remarks: "Deals with immigration and international work related issues.",
        created_by: 3,
    },
    {
        name: "Information Technology",
        remarks: "Deals with Information Technology systems, especially softwares and embedded systems.",
        created_by: 4,
    },
    {
        name: "Hospatility",
        remarks: "Deals with Hospitality.",
        created_by: 4,
    },
  ]);
}
