import { Router } from 'express';

import * as foods from '../controllers/foods';
import { validateFood, validateFoodSchema } from '../validators/food';
import { validateCategory } from '../validators/category';

const router = Router();

/**
 * GET /foods
 */
router.get('/', foods.fetchAll);

/**
 * GET /foods/:id
 */
router.get('/:id',validateFood, foods.fetchById);

/**
 * GET /foods/category/:id
 */
router.get('/category/:id',validateCategory, foods.fetchByCategoryId);

/**
 * POST /foods
 */
router.post('/',validateFoodSchema, foods.save);

/**
 * PUT /foods/:id
 */
router.put('/:id',validateFood, foods.update);


export default router;
