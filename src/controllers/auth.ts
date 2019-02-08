import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import config from '../config/config';
import * as authService from '../services/auth';
import { AuthRequest } from '../domains/request/AuthRequest';
import { User } from '../domains/common/User';

import * as objUtil from '../utils/object';

import AuthForbiddenError from '../errors/auth/AuthForbiddenError';

/**
 * generate and save the referesh token.
 *
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function generateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const JWT_SECRET = config.jwtSecret;
    let refreshToken = req.body.refreshToken ? req.body.refreshToken : false;
    let accessToken = '';
    const user: User = req.user ? req.user : req.body.user;
    const response = {
      user,
      refreshToken,
      accessToken
    };

    const accessTokenExpiry = 60 * 2; // 2 mins
    const refreshTokenExpiry = '7d'; // 7 days

    if (refreshToken) {
      // Create a new Access Token
      const adjustedUser = objUtil.withoutAttrs(user, ['iat', 'exp']);
      accessToken = jwt.sign(adjustedUser, JWT_SECRET, {
        expiresIn: accessTokenExpiry
      });

      response.accessToken = accessToken;
    } else if (user && user.id) {
      // Create a new Refresh and Access Token
      // Store the refresh token in the database
      // Removing unwanted properties
      const adjustedUser = objUtil.withoutAttrs(user, ['iat', 'exp']);

      refreshToken = jwt.sign(adjustedUser, JWT_SECRET, {
        expiresIn: refreshTokenExpiry
      });

      accessToken = jwt.sign(adjustedUser, JWT_SECRET, {
        expiresIn: accessTokenExpiry
      });

      const { headers } = req;
      const userAgent = headers['user-agent'];

      const dbToken = {
        token: refreshToken,
        device: userAgent,
        userId: user.id
      };

      await authService.storeToken(dbToken);

      response.refreshToken = refreshToken;
      response.accessToken = accessToken;
    }

    res.json(response);
  } catch (error) {
    next(new AuthForbiddenError('Error'));
  }
}
