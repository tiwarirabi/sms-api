import { Router } from 'express';
import * as formidableMiddleware from 'express-formidable';

import * as image from '../controllers/image';

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
    uploadDir: './src/uploads/'
  }),
  image.upload
);

export default router;
