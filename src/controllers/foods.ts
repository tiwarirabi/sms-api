import { Request, Response, NextFunction } from 'express';

import * as foodService from '../services/food';

/**
 * Search using paams or fetch all if no params.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchAll(req: Request, res: Response, next: NextFunction) {
  const allFoods = await foodService.fetchAll();

  res.json(allFoods);
}

/**
 * Fetch single food using id.
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
    const food = await foodService.fetchById(req.params.id);

    res.json(food);
  } catch (error) {
    throw error;
  }
}


/**
 * Fetch single food using category id.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchByCategoryId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const food = await foodService.fetchByCategoryId(req.params.id);
  
      res.json(food);
    } catch (error) {
      throw error;
    }
  }

/**
 * Save a food.
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
    const food = await foodService.save(req.body);

    res.json(food);
  } catch (error) {
    throw error;
  }
}

/**
 * Update a food.
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
    const food = await foodService.update(req.params.id, req.body);

    res.json(food);
  } catch (error) {
    throw error;
  }
}