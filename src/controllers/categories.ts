import { Request, Response, NextFunction } from 'express';

import * as categoryService from '../services/category';

/**
 * Search using paams or fetch all if no params.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const allCategories = await categoryService.fetchAll();

  res.json(allCategories);
}

/**
 * Fetch single category using id.
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
    const category = await categoryService.fetchById(req.params.id);

    res.json(category);
  } catch (error) {
    throw error;
  }
}

/**
 * Save a category.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function save(req: any, res: Response, next: NextFunction) {
  try {
    const { body } = req;

    const category = await categoryService.save({
      ...body,
      createdBy: req.user.id
    });

    res.json(category);
  } catch (error) {
    throw error;
  }
}

/**
 * Update a category.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await categoryService.update(req.params.id, req.body);

    res.json(category);
  } catch (error) {
    throw error;
  }
}
