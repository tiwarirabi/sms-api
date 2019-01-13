import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/user';
import AuthError from '../errors/AuthError';
import { AuthRequest } from '../domains/request/AuthRequest';

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

    const email = req.body.email;
    const password = req.body.password;

    const [user] = await userService.search({email,password});
    if(user) {
      (req as AuthRequest).user = user; 
      next();

    }
    next(new AuthError("Username/Password mismatch."));

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