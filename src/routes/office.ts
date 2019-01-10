import { Router } from 'express';

import * as offices from '../controllers/offices';
 import { validateOffice, validateOfficeSchema } from '../validators/office';
 import { validateUser } from '../validators/user';

const router = Router();

/**
 * GET /offices
 */
router.get('/', offices.fetchAll);

/**
 * GET /offices/:id
 */
router.get('/:id',validateOffice, offices.fetchById);

/**
 * GET /offices/user/:id
 */
router.get('/user/:id',validateUser, offices.fetchByUserId);

/**
 * POST /offices
 */
router.post('/',validateOfficeSchema, offices.save);

/**
 * PUT /offices/:id
 */
router.put('/:id',validateOffice, offices.update);


export default router;
