import { Employee } from '../domains/employee';
import * as employeeModel from '../models/employee';
import DataNotFoundError from '../errors/DataNotFoundError';

/**
 * Fetch All Employees.
 */
export async function fetchAll(): Promise<Employee[]> {
  try {
    return await employeeModel.fetch();
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch by Id.
 */
export async function fetchById(employeeId: number): Promise<Employee> {
  try {
    const [employee] = await employeeModel.fetch(employeeId);
    if (!employee) {
      throw new DataNotFoundError('employee with this id not found.');
    }

    return employee;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch by User Id.
 */
export async function fetchByUserId(userId: number): Promise<Employee> {
  try {
    const [employee] = await employeeModel.fetchByUserId(userId);
    if (!employee) {
      throw new DataNotFoundError('User with this id is not an Employee.');
    }

    return employee;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch by Office Id.
 */
export async function fetchByOfficeId(officeId: number): Promise<Employee[]> {
  try {
    const employees = await employeeModel.fetchByOfficeId(officeId);
    if (!employees || employees.length <= 0) {
      throw new DataNotFoundError('Office with this id is not an Office.');
    }

    return employees;
  } catch (error) {
    throw error;
  }
}

/**
 * Save a new employee.
 *
 * @param {Employee} employee
 */
export async function save(employee: any) {
  try {
    const [id] = await employeeModel.save(employee);

    return { id, ...employee };
  } catch (error) {
    throw error;
  }
}

/**
 * Update a employee.
 *
 * @param {number} employeeId
 * @param {Employee} employeeBody
 */
export async function update(employeeId: number, employeeBody: Employee) {
  try {
    await employeeModel.update(employeeId, employeeBody);

    return { id: employeeId, ...employeeBody };
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a employee.
 *
 * @param {number} employeeId
 */
export async function remove(employeeId: number) {
  try {
    await employeeModel.remove(employeeId);

    return { id: employeeId };
  } catch (error) {
    throw error;
  }
}
