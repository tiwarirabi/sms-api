import { Router } from 'express';

import config from './config/config';
import AuthRouter from './routes/auth';
import UserRouter from './routes/user';
import AdminRouter from './routes/admin';
import OfficeRouter from './routes/office';
import EmployeeRouter from './routes/employee';
import CategoryRouter from './routes/category';
import FoodRouter from './routes/food';

const router = Router();

/**
 * GET /info
 */
router.get('/info', (req, res) => {
  res.json({
    name: config.app.name,
    version: config.app.version,
    description: config.app.description
  });
});

/**
 * GET /auth
 */
router.use('/auth', AuthRouter);

/**
 * GET /users
 */
router.use('/users', UserRouter);

/**
 * GET /admin
 */
router.use('/admins', AdminRouter);

/**
 * GET /office
 */
router.use('/offices', OfficeRouter);

/**
 * GET /employees
 */
router.use('/employees', EmployeeRouter);

/**
 * GET /categories
 */
router.use('/categories', CategoryRouter);

/**
 * GET /foods
 */
router.use('/foods', FoodRouter);

export default router;
