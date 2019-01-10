import Knex from 'knex';

import * as db from '../utils/db';
import { Food } from '../domains/food';
import * as objectUtil from '../utils/object';

const FOOD_TABLE = 'foods';
const CATEGORIES_TABLE = 'categories';
const USER_TABLE = 'users';

const FOOD_SELECT_VALUES=[
  'food.id as id',
  'food.name as name',
  'food.price as price',
  'food.remarks as remarks',
  'food.created_at as createdAt',
  'food.updated_at as updatedAt',

  'category.id as categoryId',
  'category.name as categoryName',
  'category.display_picture as displayPicture',
  'category.remarks as remarks',

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
 * Fetch all food.
 *
 * @param {number} foodId
 * @param {knex} tx
 */
export async function fetch(
  foodId?: number,
  tx?: Knex
): Promise<Food[]> {
  const whereParam = foodId ? { 'food.id': foodId } : {};

  return db
    .connection(tx)(`${FOOD_TABLE} as food`)
    .leftJoin(`${USER_TABLE} as creator`,'food.created_by','creator.id')
    .leftJoin(`${USER_TABLE} as updator`,'food.updated_by','updator.id')
    .leftJoin(`${CATEGORIES_TABLE} as category`,`category.id`,`food.category_id`)
    .select(FOOD_SELECT_VALUES)
    .where(whereParam)
    .then( (response: any) => response.map((data: any) => mapFoodToModel(data)));    
}

/**
 * Fetch all food by category id.
 *
 * @param {number} foodId
 * @param {knex} tx
 */
export async function fetchByCategoryId(
    categoryId?: number,
    tx?: Knex
  ): Promise<Food[]> {
    const whereParam = categoryId ? { 'category.id': categoryId } : {};
  
    return db
      .connection(tx)(`${FOOD_TABLE} as food`)
      .leftJoin(`${USER_TABLE} as creator`,'food.created_by','creator.id')
      .leftJoin(`${USER_TABLE} as updator`,'food.updated_by','updator.id')
      .leftJoin(`${CATEGORIES_TABLE} as category`,`category.id`,`food.category_id`)
      .select(FOOD_SELECT_VALUES)
      .where(whereParam)
      .then( (response: any) => response.map((data: any) => mapFoodToModel(data)));    
  }




/**
 * Save Food.
 *
 * @param {Food} food
 * @param {knex} tx
 */
export function save(food: Food, tx?: Knex) {
  return db
    .connection(tx)(FOOD_TABLE)
    .insert(food);
}

/**
 * Update Food.
 *
 * @param {number} id
 * @param {Food} body
 * @param {knex} tx
 */
export function update(id: number, body: Food, tx?: Knex) {
  return db
    .connection(tx)(FOOD_TABLE)
    .where({ id })
    .update(body);
}

/**
 * Delete Food.
 *
 * @param {number} id
 * @param {knex} tx
 */
export function remove(id: number, tx?: Knex) {
  return db
    .connection(tx)(FOOD_TABLE)
    .where({ id })
    .delete();
}

/**
 * Map Food to Model.
 * 
 * @param {any} obj 
 */
function mapFoodToModel(obj: any): Food{
    const food: Food = {
        ...objectUtil.withOnlyAttrs(obj,[
            'id','name','price', 'remarks', 'categoryId', 'createdAt', 'updatedAt'
        ]),
    };

    if (obj.hasOwnProperty('categoryId') && obj.categoryId) {
        food.category = {
            id: obj.categoryId,
            name: obj.categoryName,
            remarks: obj.remarks,
            displayPicture: obj.displayPicture,
        };
    }

    if (obj.hasOwnProperty('creatorId') && obj.creatorId) {
        food.createdBy = {
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
        food.updatedBy = {
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
  
  return food;
}