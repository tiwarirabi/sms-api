import { Request, Response, NextFunction } from 'express';

import * as categoryService from '../services/category';

/**
 * Validate timesheet existence.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    await categoryService.fetchById(id);

    next();
  } catch (error) {
    next(error);
  }
}



/**
 * Validate category Schema.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateCategorySchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //const category = req.body;

    next();
  } catch (error) {
    next(error);
  }
}