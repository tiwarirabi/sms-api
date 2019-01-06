import { Request, Response, NextFunction } from 'express';

import * as adminService from '../services/admin';

/**
 * Search using paams or fetch all if no params.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchAll(req: Request, res: Response, next: NextFunction) {
  const allAdmins = await adminService.fetchAll();

  res.json(allAdmins);
}

/**
 * Fetch single admin using id.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const admin = await adminService.fetchById(req.params.id);

    res.json(admin);
  } catch (error) {
    throw error;
  }
}


/**
 * Fetch single admin using user id.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const admin = await adminService.fetchByUserId(req.params.id);
  
      res.json(admin);
    } catch (error) {
      throw error;
    }
  }
  