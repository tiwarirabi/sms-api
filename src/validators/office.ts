import { Request, Response, NextFunction } from 'express';

import * as officeService from '../services/office';

/**
 * Validate office existence.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateOffice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    await officeService.fetchById(id);

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Validate office Schema.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateOfficeSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const office = req.body;

    next();
  } catch (error) {
    next(error);
  }
}
