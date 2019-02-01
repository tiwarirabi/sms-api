import Knex from 'knex';
/**
 * Load initial seed data for users.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('users').insert([
    {
      email: 'info@3jhakri.com',
      password: 'super',
      type: 'admin',
      first_name: 'Super',
      middle_name: null,
      last_name: 'Admin',
      mobile: '041403289',
      gender: 'male',
      email_verification_code: null,
      mobile_verification_code: null,
      display_picture: null,
      last_logged_in: '2019-01-05',
      created_by: 1
    },
    {
      email: 'ravi@3jhakri.com',
      password: 'ravi',
      type: 'admin',
      first_name: 'Ravi',
      middle_name: null,
      last_name: 'Tiwari',
      gender: 'male',
      mobile: '9843500543',
      email_verification_code: null,
      mobile_verification_code: null,
      display_picture: null,
      last_logged_in: '2019-01-05',
      created_by: 1
    },
    {
      email: 'bibek@3jhakri.com',
      password: 'bibek',
      type: 'admin',
      first_name: 'Bibek',
      middle_name: null,
      last_name: 'Adhikari',
      gender: 'male',
      mobile: '9843500544',
      email_verification_code: null,
      mobile_verification_code: null,
      display_picture: null,
      last_logged_in: null,
      created_by: 2
    },
    {
      email: 'prakash@3jhakri.com',
      password: 'prakash',
      type: 'admin',
      first_name: 'Prakash',
      middle_name: null,
      last_name: 'Adhikari',
      mobile: '9843500545',
      email_verification_code: null,
      mobile_verification_code: null,
      gender: 'male',
      display_picture: null,
      last_logged_in: null,
      created_by: 2
    },
    {
      email: 'reshma@cnd.com',
      password: 'reshma',
      type: 'office',
      first_name: 'Reshma',
      middle_name: null,
      last_name: 'Bhujel',
      mobile: '9843500546',
      gender: 'female',
      email_verification_code: null,
      mobile_verification_code: null,
      display_picture: null,
      last_logged_in: null,
      created_by: 4
    },
    {
      email: 'ruchi@8848.edu.au',
      password: 'ruchi',
      type: 'office',
      first_name: 'Ruchi',
      middle_name: null,
      last_name: 'Pradhan',
      gender: 'female',
      mobile: '9843500547',
      email_verification_code: null,
      mobile_verification_code: null,
      display_picture: null,
      last_logged_in: null,
      created_by: 3
    },
    {
      email: 'saroj@cnd.com',
      password: 'saroj',
      type: 'employee',
      first_name: 'Saroj',
      middle_name: 'Raj',
      last_name: 'Upadhya',
      gender: 'male',
      mobile: '9843500548',
      email_verification_code: null,
      mobile_verification_code: null,
      display_picture: null,
      last_logged_in: null,
      created_by: 3
    },
    {
      email: 'dhiraj@cnd.com',
      password: 'dhiraj',
      type: 'employee',
      first_name: 'Saroj',
      middle_name: 'Raj',
      last_name: 'Upadhya',
      gender: 'male',
      mobile: '9843500549',
      email_verification_code: '4FG56T',
      mobile_verification_code: '572483',
      display_picture: null,
      last_logged_in: null,
      created_by: 3
    },
    {
      email: 'aman@8848.edu.au',
      password: 'aman',
      type: 'employee',
      first_name: 'Aman',
      middle_name: 'Jung',
      last_name: 'Karki',
      gender: 'male',
      mobile: '9843500550',
      email_verification_code: null,
      mobile_verification_code: '291730',
      display_picture: null,
      last_logged_in: null,
      created_by: 3
    }
  ]);
}
