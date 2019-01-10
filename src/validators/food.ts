import { Request, Response, NextFunction } from 'express';

import * as foodService from '../services/food';

/**
 * Validate foods existence.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateFood(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    await foodService.fetchById(id);

    next();
  } catch (error) {
    next(error);
  }
}



/**
 * Validate food Schema.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateFoodSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //const food = req.body;

    next();
  } catch (error) {
    next(error);
  }
}