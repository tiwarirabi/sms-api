import Knex from 'knex';
/**
 * Load initial seed data for employee_offices.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('employee_offices').insert([
    {
      employee_id: 1,
      office_id: 1,
      employment_type: 'full-time',
      joining_date: '2015-03-20',
      department: 'Bar Master',
      designation: 'Sr. Bar Instructor',
      created_by: 1
    },
    {
      employee_id: 2,
      office_id: 1,
      joining_date: '2017-03-20',
      employment_type: 'full-time',
      department: 'Barista',
      designation: 'Asst. Bar Instructor',
      created_by: 1
    },
    {
      employee_id: 3,
      office_id: 2,
      joining_date: '2013-03-20',
      employment_type: 'full-time',
      department: 'Counsellor',
      designation: 'Sr. Education Counseller',
      created_by: 1
    }
  ]);
}
