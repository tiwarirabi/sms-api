import { Request, Response, NextFunction } from 'express';

// import * as userService from '../services/user';

/**
 * Validate users login.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    // const email = req.body.email;
    // await userService.fetchById(id);

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Validate user token.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    
    //const token = req.body;

    next();
  } catch (error) {
    next(error);
  }
}