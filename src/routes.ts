import { Router } from 'express';

import * as smsController from './controllers/sms';

const router = Router();

/**
 * /info
 */
router.get('/info', (req, res) => {
  res.json({
    name: "easydigital-sms-api",
    version:"0.0.1",
    description:"An easy sms service from easydigital."
  });
});


router.post('/sms', smsController.sms );

export default router;
