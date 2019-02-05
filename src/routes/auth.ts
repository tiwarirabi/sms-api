import { Router } from 'express';

import { generateToken } from '../controllers/auth';
import {
  validateLogin,
  validateRefreshToken,
  checkUser
} from '../validators/auth';

import * as users from '../controllers/users';

const router = Router();

/**
 * POST /auth
 */
router.post('/', validateLogin, generateToken);

/**
 * POST /auth/token
 */
router.post('/token', validateRefreshToken, generateToken);

/**
 * POST /signup
 */
router.post('/signup', checkUser, users.save);

export default router;
