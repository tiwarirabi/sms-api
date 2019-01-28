import { Router } from 'express';

import { generateToken } from '../controllers/auth';
import { validateLogin, validateToken } from '../validators/auth';

const router = Router();

/**
 * POST /auth
 */
router.post('/', validateLogin, generateToken);

/**
 * POST /auth/token
 */
router.get('/', validateToken, generateToken);

export default router;
