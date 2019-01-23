import { Router } from 'express';

import * as auth from '../controllers/auth';
import { validateLogin, validateToken } from '../validators/auth';

const router = Router();

/**
 * POST /auth
 */
router.post('/', validateLogin, auth.generateToken);

/**
 * POST /auth/token
 */
router.get('/', validateToken, auth.generateToken);

export default router;
