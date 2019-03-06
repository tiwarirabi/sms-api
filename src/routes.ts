import { Router } from 'express';

import config from './config/config';

import AuthRouter from './routes/auth';
import UserRouter from './routes/user';
import AdminRouter from './routes/admin';
import OfficeRouter from './routes/office';
import EmployeeRouter from './routes/employee';
import CategoryRouter from './routes/category';
import FoodRouter from './routes/food';
import ImageRouter from './routes/image';

import { validateAccessToken } from './validators/auth';
import * as routeTokenValidators from './validators/routeTokenValidators';

const router = Router();

/**
 * /info
 */
router.get('/info', (req, res) => {
  res.json({
    name: config.app.name,
    version: config.app.version,
    description: config.app.description
  });
});

/**
 *  /image
 */
router.use('/image', ImageRouter);

/**
 * /auth
 */
router.use('/auth', AuthRouter);

/**
 * /categories
 */
router.use(
  '/categories',
  validateAccessToken,
  routeTokenValidators.userRouteValidator,
  CategoryRouter
);

/**
 * /foods
 */
router.use(
  '/foods',
  validateAccessToken,
  routeTokenValidators.userRouteValidator,
  FoodRouter
);

/**
 * /users
 */
router.use(
  '/users',
  validateAccessToken,
  routeTokenValidators.userRouteValidator,
  UserRouter
);

/**
 * /employees
 */
router.use(
  '/employees',
  validateAccessToken,
  routeTokenValidators.userRouteValidator,
  EmployeeRouter
);

/**
 * /office
 */
router.use(
  '/offices',
  validateAccessToken,
  routeTokenValidators.userRouteValidator,
  OfficeRouter
);

/**
 * /admin
 */

router.use(
  '/admins',
  validateAccessToken,
  routeTokenValidators.adminRouteValidator,
  AdminRouter
);

export default router;
