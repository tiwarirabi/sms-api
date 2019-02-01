import { Router } from 'express';

import * as users from '../controllers/users';
import { validateUser, validateUserSchema } from '../validators/user';

const router = Router();

/**
 * GET /users
 */
router.get('/', users.fetchAll);

/**
 * GET /users/:id
 */
router.get('/:id', validateUser, users.fetchById);

/**
 * POST /users
 */
router.post('/', validateUserSchema, users.save);

/**
 * PUT /users/:id
 */
router.put('/:id', validateUser, users.update);

export default router;
