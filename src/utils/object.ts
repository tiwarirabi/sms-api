import * as camelCase from 'camelize';
import * as snakeCase from 'js-snakecase';
import { differenceBy, intersectionBy } from 'lodash';

/**
 * Get the copy of object without attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrsToExclude
 * @return {Object}
 */
export function withoutAttrs(obj: any, attrsToExclude: any[]) {
  const result: any = {};

  Object.keys(obj).forEach((key: string) => {
    if (!attrsToExclude.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

/**
 * Get the copy of object with only specified attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrs
 * @return {Object}
 */
export function withOnlyAttrs(obj: any, attrs: any[]) {
  const result: any = {};

  Object.keys(obj).forEach(key => {
    if (attrs.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

/**
 * Compare array of two objects and find data that needs to be create, update
 * and delete.
 *
 * @param {Array} list1
 * @param {Array} list2
 * @param {String} key
 * @returns {Object}
 */
export function difference(list1: any[], list2: any[], key: string = 'id') {
  return {
    create: list2
      .filter(obj => obj.hasOwnProperty(key) && obj[key] === null)
      .map(obj => withoutAttrs(obj, [key])),
    update: intersectionBy(list2, list1, key),
    destroy: differenceBy(list1, list2, key).map(obj => obj[key])
  };
}

  /**
   * Make objects value into camelCase.
   *
   * @param {Object} obj
   * @returns {Object}
   */
  export function toCamelCase(obj: any) {
    return camelCase(obj);
  }

/**
 * Make objects value into snake_case.
 *
 * @param {Object} obj
 * @returns {Object}
 */
export function toSnakeCase(obj: any) {
  return snakeCase.toSnakeCase(obj);
}
