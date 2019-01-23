import { Router } from 'express';

import * as categories from '../controllers/categories';
import {
  validateCategory,
  validateCategorySchema
} from '../validators/category';

const router = Router();

/**
 * GET /categories
 */
router.get('/', categories.fetchAll);

/**
 * GET /categories/:id
 */
router.get('/:id', validateCategory, categories.fetchById);

/**
 * POST /categories
 */
router.post('/', validateCategorySchema, categories.save);

/**
 * PUT /categories/:id
 */
router.put('/:id', validateCategory, categories.update);

export default router;
