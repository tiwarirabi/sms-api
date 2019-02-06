import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as userService from '../services/user';
import * as authService from '../services/auth';

import { AuthRequest } from '../domains/request/AuthRequest';
import { User } from '../domains/common/User';

import AuthForbiddenError from '../errors/auth/AuthForbiddenError';
import AuthUnauthorizedError from '../errors/auth/AuthUnauthorizedError';
import NotFoundError from '../errors/DataNotFoundError';

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
    const { body: { email = null, password = null } = {} } = req;

    const [user] = await userService.search({ email, password });

    if (user) {
      (req as AuthRequest).user = user;
      next();
    } else {
      throw new NotFoundError('Username/Password mismatch.');
    }
  } catch (error) {
    return next(error);
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
export async function validateAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    headers: { authorization }
  } = req;

  let accessToken = null;

  if (
    authorization &&
    authorization.split(' ')[0] === 'Bearer' &&
    authorization.split(' ')[1] !== undefined
  ) {
    accessToken = authorization.split(' ')[1];
  }

  if (!accessToken) {
    next(new AuthForbiddenError('Access Token Not Set'));
  } else {
    try {
      const decoded = jwt.verify(accessToken, config.jwtSecret);
      const user = decoded as User;
      (req as AuthRequest).user = user;

      next();
    } catch (error) {
      next(new AuthUnauthorizedError('Access Token invalid'));
    }
  }
}

/**
 * Validate user refresh token.
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function validateRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body: { refreshToken = null } = {} } = req;

  if (!refreshToken) {
    next(new AuthForbiddenError('Refresh Token Not Set'));
  } else {
    try {
      const decoded = jwt.verify(refreshToken, config.jwtSecret);

      const user = decoded as User;

      // check if refresh token is in the database and is not set to expired
      const dbToken = {
        userId: user.id,
        token: refreshToken,
        hasExpired: 0
      };
      const userDbToken = dbToken
        ? await authService.validateTokenInDatabase(dbToken)
        : false;

      if (!userDbToken || userDbToken.length <= 0) {
        throw new Error();
      }

      (req as AuthRequest).user = user;

      next();
    } catch (error) {
      next(new AuthUnauthorizedError('Refresh Token invalid'));
    }
  }
}
