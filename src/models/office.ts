import Knex from 'knex';

import * as db from '../utils/db';
import { Office } from '../domains/office';
import * as objectUtil from '../utils/object';

const USER_TABLE = 'users';
const USER_OFFICE_TABLE = 'users_office';

/**
 * Fetch all office.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function fetch(officeId?: number, tx?: Knex): Promise<Office[]> {
  const whereParam = officeId ? { 'office.id': officeId } : {};

  return db
    .connection(tx)(`${USER_OFFICE_TABLE} as office`)
    .leftJoin(`${USER_TABLE} as user`, 'office.user_id', 'user.id')
    .leftJoin(`${USER_TABLE} as verifier`, 'office.verified_by', 'verifier.id')
    .leftJoin(`${USER_TABLE} as creator`, 'office.created_by', 'creator.id')
    .leftJoin(`${USER_TABLE} as updator`, 'office.updated_by', 'updator.id')
    .select(
      'office.id as id',
      'office.name as name',
      'office.location as location',
      'office.location_gps as locationGps',
      'office.no_of_employees as noOfEmployees',
      'office.max_budget as maxBudget',
      'office.phone as phone',
      'office.pan_no as panNo',
      'office.regd_no as regdNo',
      'office.is_verified as isVerified',
      'office.created_at as createdAt',
      'office.updated_at as updatedAt',
      'office.verified_at as verifiedAt',
      'office.delivery_time as deliveryTime',
      'office.remarks as remarks',

      'user.id as userId',
      'user.email as userEmail',
      'user.type as userType',
      'user.first_name as userFirstName',
      'user.middle_name as userMiddleName',
      'user.last_name as userLastName',
      'user.mobile as userMobile',
      'user.display_picture as userDispayPicture',
      'user.last_logged_in as userLastLoggedIn',

      'verifier.id as verifierId',
      'verifier.email as verifierEmail',
      'verifier.type as verifierType',
      'verifier.first_name as verifierFirstName',
      'verifier.middle_name as verifierMiddleName',
      'verifier.last_name as verifierLastName',
      'verifier.mobile as verifierMobile',
      'verifier.display_picture as verifierDispayPicture',
      'verifier.last_logged_in as verifierLastLoggedIn',

      'creator.id as creatorId',
      'creator.email as creatorEmail',
      'creator.type as creatorType',
      'creator.first_name as creatorFirstName',
      'creator.middle_name as creatorMiddleName',
      'creator.last_name as creatorLastName',
      'creator.mobile as creatorMobile',
      'creator.display_picture as creatorDispayPicture',
      'creator.last_logged_in as creatorLastLoggedIn',

      'updator.id as updatorId',
      'updator.email as updatorEmail',
      'updator.type as updatorType',
      'updator.first_name as updatorFirstName',
      'updator.middle_name as updatorMiddleName',
      'updator.last_name as updatorLastName',
      'updator.mobile as updatorMobile',
      'updator.display_picture as updatorDispayPicture',
      'updator.last_logged_in as updatorLastLoggedIn'
    )
    .where(whereParam)
    .then((response: any) =>
      response.map((data: any) => mapOfficeToModel(data))
    );
}

/**
 * Fetch office by userId.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function fetchByUserId(
  userId?: number,
  tx?: Knex
): Promise<Office[]> {
  const whereParam = userId ? { 'office.user_id': userId } : {};

  return db
    .connection(tx)(`${USER_OFFICE_TABLE} as office`)
    .leftJoin(`${USER_TABLE} as user`, 'office.user_id', 'user.id')
    .leftJoin(`${USER_TABLE} as verifier`, 'office.verified_by', 'verifier.id')
    .leftJoin(`${USER_TABLE} as creator`, 'office.created_by', 'creator.id')
    .leftJoin(`${USER_TABLE} as updator`, 'office.updated_by', 'updator.id')
    .select(
      'office.id as id',
      'office.name as name',
      'office.location as location',
      'office.location_gps as locationGps',
      'office.no_of_employees as noOfEmployees',
      'office.max_budget as maxBudget',
      'office.phone as phone',
      'office.pan_no as panNo',
      'office.regd_no as regdNo',
      'office.is_verified as isVerified',
      'office.created_at as createdAt',
      'office.updated_at as updatedAt',
      'office.verified_at as verifiedAt',
      'office.delivery_time as deliveryTime',
      'office.remarks as remarks',

      'user.id as userId',
      'user.email as userEmail',
      'user.type as userType',
      'user.first_name as userFirstName',
      'user.middle_name as userMiddleName',
      'user.last_name as userLastName',
      'user.mobile as userMobile',
      'user.display_picture as userDispayPicture',
      'user.last_logged_in as userLastLoggedIn',

      'verifier.id as verifierId',
      'verifier.email as verifierEmail',
      'verifier.type as verifierType',
      'verifier.first_name as verifierFirstName',
      'verifier.middle_name as verifierMiddleName',
      'verifier.last_name as verifierLastName',
      'verifier.mobile as verifierMobile',
      'verifier.display_picture as verifierDispayPicture',
      'verifier.last_logged_in as verifierLastLoggedIn',

      'creator.id as creatorId',
      'creator.email as creatorEmail',
      'creator.type as creatorType',
      'creator.first_name as creatorFirstName',
      'creator.middle_name as creatorMiddleName',
      'creator.last_name as creatorLastName',
      'creator.mobile as creatorMobile',
      'creator.display_picture as creatorDispayPicture',
      'creator.last_logged_in as creatorLastLoggedIn',

      'updator.id as updatorId',
      'updator.email as updatorEmail',
      'updator.type as updatorType',
      'updator.first_name as updatorFirstName',
      'updator.middle_name as updatorMiddleName',
      'updator.last_name as updatorLastName',
      'updator.mobile as updatorMobile',
      'updator.display_picture as updatorDispayPicture',
      'updator.last_logged_in as updatorLastLoggedIn'
    )
    .where(whereParam)
    .then((response: any) =>
      response.map((data: any) => mapOfficeToModel(data))
    );
}

/**
 * Save contract type.
 *
 * @param {Office} office
 * @param {knex} tx
 */
export function save(office: Office, tx?: Knex) {
  return db
    .connection(tx)(USER_OFFICE_TABLE)
    .insert(office);
}

/**
 * Update contract type.
 *
 * @param {number} id
 * @param {Office} body
 * @param {knex} tx
 */
export function update(id: number, body: Office, tx?: Knex) {
  return db
    .connection(tx)(USER_OFFICE_TABLE)
    .where({ id })
    .update(body);
}

/**
 * Delete contract type.
 *
 * @param {number} id
 * @param {knex} tx
 */
export function remove(id: number, tx?: Knex) {
  return db
    .connection(tx)(USER_OFFICE_TABLE)
    .where({ id })
    .delete();
}

/**
 * Map an object to office interface type.
 * @param {Any} obj
 */
function mapOfficeToModel(obj: any): Office {
  const office: Office = {
    ...objectUtil.withOnlyAttrs(obj, [
      'id',
      'name',
      'location',
      'locationGps',
      'noOfEmployees',
      'maxBudget',
      'phone',
      'panNo',
      'regdNo',
      'isVerified',
      'createdAt',
      'updatedAt',
      'verifiedAt',
      'deliveryTime',
      'remarks'
    ])
  };

  if (obj.hasOwnProperty('userId') && obj.userId) {
    office.user = {
      id: obj.userId,
      type: obj.userType,
      email: obj.userEmail,
      firstName: obj.userFirstName,
      middleName: obj.userMiddleName,
      lastName: obj.userLastName,
      lastLoggedIn: obj.userLastLoggedIn,
      displayPicture: obj.userDisplayPicture ? obj.userDisplayPicture : null,
      mobile: obj.userMobile
    };
  }

  if (obj.hasOwnProperty('verifierId') && obj.verifierId) {
    office.verifiedBy = {
      id: obj.verifierId,
      type: obj.verifierType,
      email: obj.verifierEmail,
      firstName: obj.verifierFirstName,
      middleName: obj.verifierMiddleName,
      lastName: obj.verifierLastName,
      lastLoggedIn: obj.verifierLastLoggedIn,
      displayPicture: obj.verifierDisplayPicture
        ? obj.verifierDisplayPicture
        : null,
      mobile: obj.verifierMobile
    };
  }

  if (obj.hasOwnProperty('creatorId') && obj.creatorId) {
    office.createdBy = {
      id: obj.creatorId,
      type: obj.creatorType,
      email: obj.creatorEmail,
      firstName: obj.creatorFirstName,
      middleName: obj.creatorMiddleName,
      lastName: obj.creatorLastName,
      lastLoggedIn: obj.creatorLastLoggedIn,
      displayPicture: obj.creatorDisplayPicture,
      mobile: obj.creatorMobile
    };
  }

  if (obj.hasOwnProperty('updatorId') && obj.updatorId) {
    office.updatedBy = {
      id: obj.updatorId,
      type: obj.updatorType,
      email: obj.updatorEmail,
      firstName: obj.updatorFirstName,
      middleName: obj.updatorMiddleName,
      lastName: obj.updatorLastName,
      lastLoggedIn: obj.updatorLastLoggedIn,
      displayPicture: obj.updatorDisplayPicture,
      mobile: obj.updatorMobile
    };
  }

  return office;
}
