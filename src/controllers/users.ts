import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/user';

/**
 * Search using paams or fetch all if no params.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchAll(req: Request, res: Response, next: NextFunction) {
  const allUsers = await userService.fetchAll();

  res.json(allUsers);
}

/**
 * Fetch single user using id.
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
    const user = await userService.fetchById(req.params.id);

    res.json(user);
  } catch (error) {
    throw error;
  }
}

/**
 * Save a user.
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
    const user = await userService.save(req.body);

    res.json(user);
  } catch (error) {
    throw error;
  }
}

/**
 * Update a user.
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
    const user = await userService.update(req.params.id, req.body);

    res.json(user);
  } catch (error) {
    throw error;
  }
}
