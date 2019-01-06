import { Router } from 'express';

import * as users from '../controllers/users';
 import { validateUser } from '../validators/user';

const router = Router();

/**
 * GET /users
 */
router.get('/', users.fetchAll);


/**
 * GET /users/:id
 */
router.get('/:id',validateUser, users.fetchById);


export default router;
