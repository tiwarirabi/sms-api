import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/user';

/**
 * Validate users existence.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    await userService.fetchById(id);

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Validate user Schema.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateUserSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const user = req.body;

    next();
  } catch (error) {
    next(error);
  }
}
