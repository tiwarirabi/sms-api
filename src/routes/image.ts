import { Router } from 'express';
import * as formidableMiddleware from 'express-formidable';

import * as image from '../controllers/image';
import config from '../config/config';

const router = Router();

/**
 * POST /image
 */
router.get('/:fileName', image.fetch);

/**
 * POST /image
 */
router.post(
  '/',
  formidableMiddleware({
    uploadDir: `./${config.app.uploadDir}`
  }),
  image.upload
);

export default router;
