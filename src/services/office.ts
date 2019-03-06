import { Office } from '../domains/office';
import * as officeModel from '../models/office';
import * as industriesModel from '../models/industry';
import NotFoundError from '../errors/NotFoundError';

/**
 * Fetch All Office.
 */
export async function fetchAll(): Promise<Office[]> {
  try {
    return await officeModel.fetch();
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch by Id.
 */
export async function fetchById(officeId: number): Promise<Office> {
  try {
    const [office] = await officeModel.fetch(officeId);

    if (!office) {
      throw new NotFoundError('Office with this id not found.');
    }

    const industries = await industriesModel.fetchByOfficeId(office.id);

    office.industries = industries;

    return office;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch by User Id.
 */
export async function fetchByUserId(userId: number): Promise<Office> {
  try {
    const [office] = await officeModel.fetchByUserId(userId);
    if (!office) {
      throw new NotFoundError('User with this id is not an office.');
    }

    return office;
  } catch (error) {
    throw error;
  }
}

/**
 * Save a new office.
 *
 * @param {Office} office
 */
export async function save(office: any) {
  try {
    const [id] = await officeModel.save(office);

    return { id, ...office };
  } catch (error) {
    throw error;
  }
}

/**
 * Update a office.
 *
 * @param {number} officeId
 * @param {Office} officeBody
 */
export async function update(officeId: number, officeBody: Office) {
  try {
    await officeModel.update(officeId, officeBody);

    return { id: officeId, ...officeBody };
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a office.
 *
 * @param {number} officeId
 */
export async function remove(officeId: number) {
  try {
    await officeModel.remove(officeId);

    return { id: officeId };
  } catch (error) {
    throw error;
  }
}
