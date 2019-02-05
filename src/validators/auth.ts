import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as userService from '../services/user';

import { AuthRequest } from '../domains/request/AuthRequest';
import { User } from '../domains/common/User';

import AuthForbiddenError from '../errors/auth/AuthForbiddenError';
import AuthUnauthorizedError from '../errors/auth/AuthUnauthorizedError';
import NotFoundError from '../errors/DataNotFoundError';
import databaseError from '../errors/DatabaseError';

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

      (req as AuthRequest).user = user;

      next();
    } catch (error) {
      next(new AuthUnauthorizedError('Refresh Token invalid'));
    }
  }
}

/**
 * check for existing user
 *
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 * @returns {Promise}
 */
export async function checkUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mobile = req.body.mobile;
    const email = req.body.email;

    const [userMobile] = await userService.search({ mobile });
    const [userEmail] = await userService.search({ email });

    if (!userMobile && !userEmail) {
      next();
    } else {
      let errorString = '';

      if (userMobile) {
        errorString += `${mobile} `;
      }
      if (userMobile && userEmail) {
        errorString += `& ${email} `;
      } else if (userEmail) {
        errorString += `${email} `;
      }

      errorString += 'already exists';

      throw new databaseError('Already regisered', errorString);
    }
  } catch (error) {
    return next(error);
  }
}
