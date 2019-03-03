import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '../config/config';
import * as userService from '../services/user';
import * as authService from '../services/auth';

import { AuthRequest } from '../domains/request/AuthRequest';
import { User } from '../domains/common/User';

import AuthForbiddenError from '../errors/auth/AuthForbiddenError';
import AuthUnauthorizedError from '../errors/auth/AuthUnauthorizedError';
import NotFoundError from '../errors/NotFoundError';
import DataDuplicateError from '../errors/DataDuplicateError';

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
    // Checking if the token hass valid signature in it
    try {
      jwt.decode(refreshToken);
    } catch (error) {
      next(new AuthUnauthorizedError('Refresh Token Signature Invalid.'));
    }

    try {
      const decodedRefreshToken = jwt.verify(refreshToken, config.jwtSecret);

      const user = decodedRefreshToken as User;

      // check if refresh token is in the database and is not set to expired
      const dbToken = {
        userId: user.id,
        token: refreshToken,
        hasExpired: 0
      };
      const userDbToken = dbToken.userId
        ? await authService.validateTokenInDatabase(dbToken)
        : false;

      if (!userDbToken || userDbToken.length <= 0) {
        // If not in database
        // If database's token has already has_exoired == 1
        // throw error
        throw new Error();
      }

      (req as AuthRequest).user = user;

      next();
    } catch (error) {
      // Set hasExpired == true in database for that token and throw error
      const user = jwt.decode(refreshToken) as User;

      const dbTokenToExpire = {
        userId: user.id,
        token: refreshToken
      };

      await authService.expireTokenInDatabase(dbTokenToExpire);

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
export async function validateUserDoNotExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body: { email, mobile } = null } = req;

    const userMobilePromise = userService.search({ mobile });
    const userEmailPromise = userService.search({ email });

    const [[userMobile], [userEmail]] = await Promise.all([
      userMobilePromise,
      userEmailPromise
    ]);

    if (!userMobile && !userEmail) {
      next();
    } else {
      const errorPayload = {
        mobile: '',
        email: ''
      };

      if (userMobile) {
        errorPayload.mobile = 'User with this Mobile is already registered.';
      }
      if (userEmail) {
        errorPayload.email = 'User with this Email is already registered.';
      }

      throw new DataDuplicateError('Already regisered', errorPayload);
    }
  } catch (error) {
    return next(error);
  }
}
