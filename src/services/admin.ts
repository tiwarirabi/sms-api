import { Admin } from '../domains/admin';
import * as adminModel from '../models/admin';
import DataNotFoundError from '../errors/DataNotFoundError';

/**
 * Fetch All Admins.
 */
export async function fetchAll(): Promise<Admin[]> {
  try {
    return await adminModel.fetch();
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetch by Id.
 */
export async function fetchById(adminId: number): Promise<Admin> {
  try {
    const [admin] = await adminModel.fetch(adminId);
    if (!admin) {
      throw new DataNotFoundError('Admin with this id not found.');
    }

    return admin;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch by User Id.
 */
export async function fetchByUserId(userId: number): Promise<Admin> {
  try {
    const [admin] = await adminModel.fetchByUserId(userId);
    if (!admin) {
      throw new DataNotFoundError('User with this id is not an admin.');
    }

    return admin;
  } catch (error) {
    throw error;
  }
}

/**
 * Save a new admin.
 *
 * @param {Admin} admin
 */
export async function save(admin: any) {
  try {
    const [id] = await adminModel.save(admin);

    return { id, ...admin };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Update a admin.
 *
 * @param {number} adminId
 * @param {Admin} adminBody
 */
export async function update(adminId: number, adminBody: Admin) {
  try {
    await adminModel.update(adminId, adminBody);

    return { id: adminId, ...adminBody };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Delete a admin.
 *
 * @param {number} adminId
 */
export async function remove(adminId: number) {
  try {
    await adminModel.remove(adminId);

    return { id: adminId };
  } catch (error) {
    throw new Error(error);
  }
}
