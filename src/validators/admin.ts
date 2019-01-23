import { Request, Response, NextFunction } from 'express';

import * as adminService from '../services/admin';

/**
 * Validate admin existence.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    await adminService.fetchById(id);

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Validate admin Schema.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateAdminSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const admin = req.body;

    next();
  } catch (error) {
    next(error);
  }
}
