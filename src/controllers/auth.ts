import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import config from '../config/config';
import * as authService from '../services/auth';
import { AuthRequest } from '../domains/request/AuthRequest';
// import * as userService from '../services/user';

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
    const user = req.user ? req.user : req.body.user;
    const response = {
      user,
      refreshToken,
      accessToken
    };

    const accessTokenExpiry = 60 * 60; // 1 hour
    const refreshTokenExpiry = '7d';

    if (refreshToken) {
      // Create a new Access Token
      accessToken = jwt.sign(user, JWT_SECRET, {
        expiresIn: accessTokenExpiry
      });

      response.accessToken = accessToken;
    } else if (user && user.id) {
      // Create a new Refresh and Access Token
      // Store the refresh token in the database

      refreshToken = jwt.sign(user, JWT_SECRET, {
        expiresIn: refreshTokenExpiry
      });
      accessToken = jwt.sign(user, JWT_SECRET, {
        expiresIn: accessTokenExpiry
      });

      await authService.storeToken(refreshToken, user.id);

      response.refreshToken = refreshToken;
      response.accessToken = accessToken;
    }

    res.json(response);
  } catch (error) {
    const errorPayload = {
      error,
      status: 404
    };

    res.status(404).json({ errorPayload });
  }
}
