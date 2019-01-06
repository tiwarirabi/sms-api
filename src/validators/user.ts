import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/user';

/**
 * Validate timesheet existence.
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
