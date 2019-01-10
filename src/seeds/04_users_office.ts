import Knex from 'knex';
/**
 * Load initial seed data for users_office.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex: Knex) {
  return knex('users_office').insert([
    {
      user_id: 5,
      name: "Coctail and Dreams Pvt. Ltd",
      location: "Anamnagar, Kathmandu",
      no_of_employees: 10,
      max_budget: 110,
      phone: "014443543",
      delivery_time: "2:00 PM",
      pan_no: "2070/04/32456",
      regd_no: "123/456789",
      is_verified: 1,
      remarks: "Barista and Bar Training Center",
      verified_by: 4,
      verified_at: new Date(),
      created_by: 2,
    },
    {
      user_id: 6,
      name: "8848 Education Consutancy",
      location: "Putalisadak, Kathmandu",
      no_of_employees: 5,
      max_budget: 100,
      phone: "014466782",
      delivery_time: "2:30 PM",
      pan_no: "2075/04/32443",
      regd_no: "987/6543210",
      is_verified: 0,
      remarks: "Austrailian Educational Consultancy",
      verified_by: null,
      created_by: 2,
    },
  ]);
}
