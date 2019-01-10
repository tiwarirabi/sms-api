import { Request, Response, NextFunction } from 'express';

import * as employeeService from '../services/employee';

/**
 * Search using paams or fetch all if no params.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchAll(req: Request, res: Response, next: NextFunction) {
  const allEmployees = await employeeService.fetchAll();

  res.json(allEmployees);
}

/**
 * Fetch single employe using id.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const employee = await employeeService.fetchById(req.params.id);

    res.json(employee);
  } catch (error) {
    throw error;
  }
}


/**
 * Fetch single employee using user id.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employee = await employeeService.fetchByUserId(req.params.id);
  
      res.json(employee);
    } catch (error) {
      throw error;
    }
  }

  /**
 * Fetch list of employees using office id.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function fetchByOfficeId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const employees = await employeeService.fetchByOfficeId(req.params.id);

    res.json(employees);
  } catch (error) {
    throw error;
  }
}
  

  /**
 * Save a employee.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function save(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const employee = await employeeService.save(req.body);

    res.json(employee);
  } catch (error) {
    throw error;
  }
}

/**
 * Update a employee.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function update(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const employee = await employeeService.update(req.params.id, req.body);

    res.json(employee);
  } catch (error) {
    throw error;
  }
}