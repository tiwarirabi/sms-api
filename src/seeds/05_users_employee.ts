import Knex from 'knex';
/**
 * Load initial seed data for users_employee.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('users_employee').insert([
    {
      user_id: 7,
      office_id: 1,
      department: "Bar Master",
      designation: "Sr. Bar Instructor",
      birth_date: "1992-03-04",
      gender: "male",
      is_veg: 0,
      joining_date: "2015-03-20",
      employment_type: "full-time",
      created_by: 5,
    },
    {
      user_id: 8,
      office_id: 1,
      department: "Barista",
      designation: "Asst. Bar Instructor",
      birth_date: "1994-03-04",
      gender: "male",
      is_veg: 1,
      joining_date: "2017-03-20",
      employment_type: "full-time",
      created_by: 5,
    },
    {
      user_id: 9,
      office_id: 2,
      department: "Counsellor",
      designation: "Sr. Education Counseller",
      birth_date: "1990-03-04",
      gender: "male",
      is_veg: 0,
      joining_date: "2013-03-20",
      employment_type: "full-time",
      created_by: 6,
    },
  ]);
}
