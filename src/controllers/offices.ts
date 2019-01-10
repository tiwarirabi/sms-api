import { Request, Response, NextFunction } from 'express';

import * as officeService from '../services/office';

/**
 * Search using paams or fetch all if no params.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchAll(req: Request, res: Response, next: NextFunction) {
  const allOffices = await officeService.fetchAll();

  res.json(allOffices);
}

/**
 * Fetch single office using id.
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
    const office = await officeService.fetchById(req.params.id);

    res.json(office);
  } catch (error) {
    throw error;
  }
}


/**
 * Fetch single office using user id.
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
      const office = await officeService.fetchByUserId(req.params.id);
  
      res.json(office);
    } catch (error) {
      throw error;
    }
  }
  

  /**
 * Save a office.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function save(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const office = await officeService.save(req.body);

    res.json(office);
  } catch (error) {
    throw error;
  }
}

/**
 * Update a office.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const office = await officeService.update(req.params.id, req.body);

    res.json(office);
  } catch (error) {
    throw error;
  }
}