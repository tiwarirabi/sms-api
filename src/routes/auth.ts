import { Router } from 'express';

import { generateToken, signup } from '../controllers/auth';
import {
  validateLogin,
  validateRefreshToken,
  validateUserDoNotExist
} from '../validators/auth';

import {
  validateSignInSchema,
  validateSignUpSchema,
  validateNewTokenSchema
} from '../validators/request/auth';

const router = Router();

/**
 * POST /auth
 */
router.post('/', validateSignInSchema, validateLogin, generateToken);

/**
 * POST /auth/token
 */
router.post(
  '/token',
  validateNewTokenSchema,
  validateRefreshToken,
  generateToken
);

/**
 * POST /signup
 */
router.post('/signup', validateSignUpSchema, validateUserDoNotExist, signup);

export default router;
