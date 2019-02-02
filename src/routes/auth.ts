import { Router } from 'express';

import { generateToken } from '../controllers/auth';
import { validateLogin, validateRefreshToken } from '../validators/auth';

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
 * POST /auth/signup
 */
// router.post('/signup', user.save);

export default router;
