import { Router } from 'express';

import * as employees from '../controllers/employees';
import {
  validateEmployee,
  validateEmployeeSchema
} from '../validators/employee';
import { validateUser } from '../validators/user';
import { validateOffice } from '../validators/office';

const router = Router();

/**
 * GET /employees
 */
router.get('/', employees.fetchAll);

/**
 * GET /employees/:id
 */
router.get('/:id', validateEmployee, employees.fetchById);

/**
 * GET /employees/user/:id
 */
router.get('/user/:id', validateUser, employees.fetchByUserId);

/**
 * GET /employees/office/:id
 */
router.get('/office/:id', validateOffice, employees.fetchByOfficeId);

/**
 * POST /employees
 */
router.post('/', validateEmployeeSchema, employees.save);

/**
 * PUT /employees/:id
 */
router.put('/:id', validateEmployee, employees.update);

export default router;
