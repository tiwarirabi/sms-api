import { Router } from 'express';

import * as admins from '../controllers/admins';
import { validateAdmin, validateAdminSchema } from '../validators/admin';
import { validateUser } from '../validators/user';

const router = Router();

/**
 * GET /admins
 */
router.get('/', admins.fetchAll);

/**
 * GET /admins/:id
 */
router.get('/:id', validateAdmin, admins.fetchById);

/**
 * GET /admins/user/:id
 */
router.get('/user/:id', validateUser, admins.fetchByUserId);

/**
 * POST /admins
 */
router.post('/', validateAdminSchema, admins.save);

/**
 * PUT /admins/:id
 */
router.put('/:id', validateAdmin, admins.update);

export default router;
