import { Router } from 'express';

import config from './config/config';
import UserRouter from './routes/user';
import AdminRouter from './routes/admin';

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
 * GET /users
 */
router.use('/users', UserRouter);


/**
 * GET /admin
 */
router.use('/admins', AdminRouter);


export default router;
