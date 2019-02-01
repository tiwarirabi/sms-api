import { Request, Response, NextFunction } from 'express';

import * as employeeService from '../services/employee';

/**
 * Validate employee existence.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    await employeeService.fetchById(id);

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Validate employee Schema.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateEmployeeSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const employee = req.body;

    next();
  } catch (error) {
    next(error);
  }
}
