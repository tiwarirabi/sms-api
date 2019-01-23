import Knex from 'knex';

import * as db from '../utils/db';
import { Category } from '../domains/category';
import * as objectUtil from '../utils/object';

const CATEGORY_TABLE = 'categories';
const USER_TABLE = 'users';

const CATEGORY_SELECT_VALUES = [
  'category.id as id',
  'category.name as name',
  'category.display_picture as displayPicture',
  'category.remarks as remarks',
  'category.created_at as createdAt',
  'category.updated_at as updatedAt',

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
 * Fetch all Category.
 *
 * @param {number} categoryId
 * @param {knex} tx
 */
export async function fetch(
  categoryId?: number,
  tx?: Knex
): Promise<Category[]> {
  const whereParam = categoryId ? { 'category.id': categoryId } : {};

  return db
    .connection(tx)(`${CATEGORY_TABLE} as category`)
    .leftJoin(`${USER_TABLE} as creator`, 'category.created_by', 'creator.id')
    .leftJoin(`${USER_TABLE} as updator`, 'category.updated_by', 'updator.id')
    .select(CATEGORY_SELECT_VALUES)
    .where(whereParam)
    .then((response: any) =>
      response.map((data: any) => mapCategoryToModel(data))
    );
}

/**
 * Save Category.
 *
 * @param {Category} category
 * @param {knex} tx
 */
export function save(category: Category, tx?: Knex) {
  return db
    .connection(tx)(CATEGORY_TABLE)
    .insert(category);
}

/**
 * Update Category.
 *
 * @param {number} id
 * @param {Category} body
 * @param {knex} tx
 */
export function update(id: number, body: Category, tx?: Knex) {
  return db
    .connection(tx)(CATEGORY_TABLE)
    .where({ id })
    .update(body);
}

/**
 * Delete Category.
 *
 * @param {number} id
 * @param {knex} tx
 */
export function remove(id: number, tx?: Knex) {
  return db
    .connection(tx)(CATEGORY_TABLE)
    .where({ id })
    .delete();
}

/**
 * Map Category to Model.
 *
 * @param {any} obj
 */
function mapCategoryToModel(obj: any): Category {
  const category: Category = {
    ...objectUtil.withOnlyAttrs(obj, [
      'id',
      'name',
      'displayPicture',
      'remarks',
      'createdAt',
      'updatedAt'
    ])
  };

  if (obj.hasOwnProperty('creatorId') && obj.creatorId) {
    category.createdBy = {
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
    category.updatedBy = {
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

  return category;
}
