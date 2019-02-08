import { User } from '../domains/common/User';
import * as userModel from '../models/user';
import NotFoundError from '../errors/NotFoundError';

import randomCode from '../utils/randomcode';

/**
 * Fetch All Users.
 */
export async function fetchAll(): Promise<User[]> {
  try {
    return await userModel.fetch();
  } catch (error) {
    throw error;
  }
}

/**
 * Search Users with params.
 */
export async function search(params: any): Promise<User[]> {
  try {
    return await userModel.search(params);
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch by Id.
 */
export async function fetchById(userId: number): Promise<User> {
  try {
    const [user] = await userModel.fetch(userId);
    if (!user) {
      throw new NotFoundError('User with this id not found.');
    }

    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Save a new user.
 *
 * @param {user} user
 */
export async function save(user: User) {
  try {
    const codeLength = 6;

    const mobileCode = randomCode(codeLength);
    const emailCode = randomCode(codeLength);

    const newUser = {
      ...user,
      emailVerificationCode: emailCode,
      mobileVerificationCode: mobileCode
    };
    const [id] = await userModel.save(newUser);

    return { id, ...user };
  } catch (error) {
    throw error;
  }
}

/**
 * Update a user.
 *
 * @param {number} userId
 * @param {User} userBody
 */
export async function update(userId: number, userBody: User) {
  try {
    await userModel.update(userId, userBody);

    return { id: userId, ...userBody };
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a user.
 *
 * @param {number} userId
 */
export async function remove(userId: number) {
  try {
    await userModel.remove(userId);

    return { id: userId };
  } catch (error) {
    throw error;
  }
}
