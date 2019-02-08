import { Router } from 'express';

import { generateToken, signup } from '../controllers/auth';
import {
  validateLogin,
  validateRefreshToken,
  validateUserDoNotExist
} from '../validators/auth';

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
router.post('/signup', validateUserDoNotExist, signup);

export default router;
