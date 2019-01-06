import Knex from 'knex';

import * as db from '../utils/db';
import { Admin } from '../domains/admin';
import * as objectUtil from '../utils/object';

const USER_TABLE = 'users';
const USER_ADMIN_TABLE = 'users_admin';

/**
 * Fetch all admin.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function fetch(
  adminId?: number,
  tx?: Knex
): Promise<Admin[]> {
  const whereParam = adminId ? { 'admin.id': adminId } : {};

  return db
    .connection(tx)(`${USER_ADMIN_TABLE} as admin`)
    .leftJoin(`${USER_TABLE} as user`,'admin.user_id','user.id')
    .leftJoin(`${USER_TABLE} as creator`,'admin.created_by','creator.id')
    .leftJoin(`${USER_TABLE} as updator`,'admin.updated_by','updator.id')
    .select(
        'admin.id as id',
        'admin.role as role',

        'user.id as userId',
        'user.email as userEmail',
        'user.type as userType',
        'user.first_name as userFirstName',
        'user.middle_name as userMiddleName',
        'user.last_name as userLastName',
        'user.mobile as userMobile',
        'user.display_picture as userDispayPicture',
        'user.last_logged_in as userLastLoggedIn',

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
        'updator.last_logged_in as updatorLastLoggedIn',
    )
    .where(whereParam)
    .then( (response: any) => response.map((data: any) => mapAdminToModel(data)));    
}


/**
 * Fetch admin by userId.
 *
 * @param {object} params
 * @param {knex} tx
 */
export async function fetchByUserId(
    userId?: number,
    tx?: Knex
  ): Promise<Admin[]> {
    const whereParam = userId ? { 'admin.user_id': userId } : {};
  
    return db
      .connection(tx)(`${USER_ADMIN_TABLE} as admin`)
      .leftJoin(`${USER_TABLE} as user`,'admin.user_id','user.id')
      .leftJoin(`${USER_TABLE} as creator`,'admin.created_by','creator.id')
      .leftJoin(`${USER_TABLE} as updator`,'admin.updated_by','updator.id')
      .select(
          'admin.id as id',
          'admin.role as role',
  
          'user.id as userId',
          'user.email as userEmail',
          'user.type as userType',
          'user.first_name as userFirstName',
          'user.middle_name as userMiddleName',
          'user.last_name as userLastName',
          'user.mobile as userMobile',
          'user.display_picture as userDispayPicture',
          'user.last_logged_in as userLastLoggedIn',
  
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
          'updator.last_logged_in as updatorLastLoggedIn',
      )
      .where(whereParam)
      .then( (response: any) => response.map((data: any) => mapAdminToModel(data)));    
  }

/**
 * Save contract type.
 *
 * @param {Admin} admin
 * @param {knex} tx
 */
export function save(admin: Admin, tx?: Knex) {
  return db
    .connection(tx)(USER_ADMIN_TABLE)
    .insert(admin);
}

/**
 * Update contract type.
 *
 * @param {number} id
 * @param {User} body
 * @param {knex} tx
 */
export function update(id: number, body: Admin, tx?: Knex) {
  return db
    .connection(tx)(USER_ADMIN_TABLE)
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
    .connection(tx)(USER_ADMIN_TABLE)
    .where({ id })
    .delete();
}




function mapAdminToModel(obj: any): Admin{
  const admin: Admin = {
       ...objectUtil.withOnlyAttrs(obj,[
           'id', 'role'
       ]),
  };

  if (obj.hasOwnProperty('userId') && obj.userId) {
    admin.user = {
      id: obj.userId,
      type: obj.userType,
      email: obj.userEmail,
      firstName: obj.userFirstName,
      middleName: obj.userMiddleName,
      lastName: obj.userLastName,
      lastToggedIn: obj.userLastLoggedIn,
      displayPicture: obj.userDisplayPicture,
      mobile: obj.userMobile,
    };
  }

  if (obj.hasOwnProperty('creatorId') && obj.creatorId) {
      admin.createdBy = {
        id: obj.creatorId,
        type: obj.creatorType,
        email: obj.creatorEmail,
        firstName: obj.creatorFirstName,
        middleName: obj.creatorMiddleName,
        lastName: obj.creatorLastName,
        lastToggedIn: obj.creatorLastLoggedIn,
        displayPicture: obj.creatorDisplayPicture,
        mobile: obj. creatorMobile,
      };
    }
  
  if (obj.hasOwnProperty('updatorId') && obj.updatorId) {
      admin.updatedBy = {
        id: obj.updatorId,
        type: obj.updatorType,
        email: obj.updatorEmail,
        firstName: obj.updatorFirstName,
        middleName: obj.updatorMiddleName,
        lastName: obj.updatorLastName,
        lastToggedIn: obj.updatorLastLoggedIn,
        displayPicture: obj.updatorDisplayPicture,
        mobile: obj. updatorMobile,
      };
    }
  
  return admin;
}