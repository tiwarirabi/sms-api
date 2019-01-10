import Knex from 'knex';

import * as db from '../utils/db';
import { Industry } from '../domains/industry';
import * as objectUtil from '../utils/object';

const INDUSTRY_TABLE = 'industries';
const OFFICE_INDUSTRY_TABLE = 'office_industries';
const USER_TABLE = 'users';

const INDUSTRY_SELECT_VALUES=[
  'industry.id as id',
  'industry.name as name',
  'industry.remarks as remarks',
  'industry.created_at as createdAt',
  'industry.updated_at as updatedAt',

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
];

/**
 * Fetch all Industry.
 *
 * @param {number} industryId
 * @param {knex} tx
 */
export async function fetch(
  industryId?: number,
  tx?: Knex
): Promise<Industry[]> {
  const whereParam = industryId ? { 'industry.id': industryId } : {};

  return db
    .connection(tx)(`${INDUSTRY_TABLE} as industry`)
    .leftJoin(`${USER_TABLE} as creator`,'user.created_by','creator.id')
    .leftJoin(`${USER_TABLE} as updator`,'user.updated_by','updator.id')
    .select(INDUSTRY_SELECT_VALUES)
    .where(whereParam)
    .then( (response: any) => response.map((data: any) => mapIndustryToModel(data)));    
}




/**
 * Fetch all Industry using office id.
 *
 * @param {number} officeId
 * @param {knex} tx
 */
export async function fetchByOfficeId(
    officeId: number,
    tx?: Knex
  ): Promise<Industry[]> {
    const whereParam = officeId ? { 'officeIndustries.office_id': officeId } : {};
  
    return db
      .connection(tx)(`${OFFICE_INDUSTRY_TABLE} as officeIndustries`)
      .leftJoin(`${INDUSTRY_TABLE} as industry`,'industry.id','officeIndustries.industry_id')
      .leftJoin(`${USER_TABLE} as creator`,'industry.created_by','creator.id')
      .leftJoin(`${USER_TABLE} as updator`,'industry.updated_by','updator.id')
      .select(INDUSTRY_SELECT_VALUES)
      .where(whereParam)
      .then( (response: any) => response.map((data: any) => mapIndustryToModel(data)));    
  }






/**
 * Save industry.
 *
 * @param {Industry} industry
 * @param {knex} tx
 */
export function save(user: Industry, tx?: Knex) {
  return db
    .connection(tx)(INDUSTRY_TABLE)
    .insert(user);
}

/**
 * Update industry.
 *
 * @param {number} id
 * @param {Industry} body
 * @param {knex} tx
 */
export function update(id: number, body: Industry, tx?: Knex) {
  return db
    .connection(tx)(INDUSTRY_TABLE)
    .where({ id })
    .update(body);
}

/**
 * Delete industry.
 *
 * @param {number} id
 * @param {knex} tx
 */
export function remove(id: number, tx?: Knex) {
  return db
    .connection(tx)(INDUSTRY_TABLE)
    .where({ id })
    .delete();
}

/**
 * Map Industry to Model.
 * 
 * @param {any} obj 
 */
function mapIndustryToModel(obj: any): Industry{
    const industry: Industry = {
        ...objectUtil.withOnlyAttrs(obj,[
            'id','name', 'remarks', 'createdAt', 'updatedAt'
        ]),
    };

    if (obj.hasOwnProperty('creatorId') && obj.creatorId) {
        industry.createdBy = {
            id: obj.creatorId,
            type: obj.creatorType,
            email: obj.creatorEmail,
            firstName: obj.creatorFirstName,
            middleName: obj.creatorMiddleName,
            lastName: obj.creatorLastName,
            lastLoggedIn: obj.creatorLastLoggedIn,
            displayPicture: obj.creatorDisplayPicture,
            mobile: obj. creatorMobile,
        };
    }
  
    if (obj.hasOwnProperty('updatorId') && obj.updatorId) {
        industry.updatedBy = {
            id: obj.updatorId,
            type: obj.updatorType,
            email: obj.updatorEmail,
            firstName: obj.updatorFirstName,
            middleName: obj.updatorMiddleName,
            lastName: obj.updatorLastName,
            lastLoggedIn: obj.updatorLastLoggedIn,
            displayPicture: obj.updatorDisplayPicture,
            mobile: obj. updatorMobile,
        };
    }
  
  return industry;
}