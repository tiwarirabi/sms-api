import { Response, NextFunction } from 'express';
import { AuthRequest } from '../domains/request/AuthRequest';

import * as userService from '../services/user';

/**
 * Search using paams or fetch all if no params.
 *
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchAll(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const allUsers = await userService.fetchAll();

  res.json(allUsers);
}

/**
 * Fetch single user using id.
 *
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchById(
  req: AuthRequest,
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
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function save(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser = req.body;

    newUser.createdBy = req.user;

    const user = await userService.save(newUser);

    res.json(user);
  } catch (error) {
    throw error;
  }
}

/**
 * Update a user.
 *
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function update(
  req: AuthRequest,
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
