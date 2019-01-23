import Knex from 'knex';

import * as db from '../utils/db';
import { User } from '../domains/common/User';
import * as objectUtil from '../utils/object';

const USER_TABLE = 'users';

const USER_SELECT_VALUES = [
  'user.id as id',
  'user.email as email',
  'user.type as type',
  'user.first_name as firstName',
  'user.middle_name as middleName',
  'user.last_name as lastName',
  'user.mobile as mobile',
  'user.display_picture as dispayPicture',
  'user.last_logged_in as lastLoggedIn',
  'user.created_at as createdAt',
  'user.updated_at as updatedAt',

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
];

/**
 * Fetch all user.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function fetch(userId?: number, tx?: Knex): Promise<User[]> {
  const whereParam = userId ? { 'user.id': userId } : {};

  return db
    .connection(tx)(`${USER_TABLE} as user`)
    .leftJoin(`${USER_TABLE} as creator`, 'user.created_by', 'creator.id')
    .leftJoin(`${USER_TABLE} as updator`, 'user.updated_by', 'updator.id')
    .select(USER_SELECT_VALUES)
    .where(whereParam)
    .then((response: any) => response.map((data: any) => mapUserToModel(data)));
}

/**
 * Search user.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function search(params: any, tx?: Knex): Promise<User[]> {
  // directly accessing email is ambigous so adding the user table name to the params.
  const keys = Object.keys(params);
  const newParams: any = {};
  keys.map((key: string) => {
    newParams[`user.${key}`] = params[key];
  });

  return db
    .connection(tx)(`${USER_TABLE} as user`)
    .leftJoin(`${USER_TABLE} as creator`, 'user.created_by', 'creator.id')
    .leftJoin(`${USER_TABLE} as updator`, 'user.updated_by', 'updator.id')
    .select(USER_SELECT_VALUES)
    .where(newParams)
    .then((response: any) => response.map((data: any) => mapUserToModel(data)));
}

/**
 * Save contract type.
 *
 * @param {user} user
 * @param {knex} tx
 */
export function save(user: User, tx?: Knex) {
  return db
    .connection(tx)(USER_TABLE)
    .insert(user);
}

/**
 * Update contract type.
 *
 * @param {number} id
 * @param {User} body
 * @param {knex} tx
 */
export function update(id: number, body: User, tx?: Knex) {
  return db
    .connection(tx)(USER_TABLE)
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
    .connection(tx)(USER_TABLE)
    .where({ id })
    .delete();
}

function mapUserToModel(obj: any): User {
  const user: User = {
    ...objectUtil.withOnlyAttrs(obj, [
      'id',
      'email',
      'type',
      'firstName',
      'middleName',
      'lastName',
      'mobile',
      'displayPicture',
      'lastLoggedIn',
      'createdAt',
      'updatedAt'
    ])
  };

  if (obj.hasOwnProperty('creatorId') && obj.creatorId) {
    user.createdBy = {
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
    user.updatedBy = {
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

  return user;
}
