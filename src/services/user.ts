import { User } from '../domains/common/User';
import * as userModel from '../models/user';
import DataNotFoundError from '../errors/DataNotFoundError';

/**
 * Fetch All Users.
 */
export async function fetchAll(): Promise<Array<User>> {
  
    try {

        return await userModel.fetch();
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Search Users with params.
 */
export async function search(params: any): Promise<Array<User>> {
  
    try {

        return await userModel.search(params);
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Fetch by Id.
 */
export async function fetchById(userId: number): Promise<User> {
  
    try {

        const [user] = await userModel.fetch(userId);
        if(!user) throw new DataNotFoundError("User with this id not found.");
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Save a new user.
 *
 * @param {user} user
 */
export async function save(user: any) {
  
    try {
        const [id] = await userModel.save(user);

        return { id, ...user };
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * Update a user.
 *
 * @param {number} userId
 * @param {User} userBody
 */
export async function update(
  userId: number,
  userBody: User
) {
  
    try {
        await userModel.update(userId, userBody);

        return { id: userId, ...userBody };
    } catch (error) {
        throw new Error(error);
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
        throw new Error(error);
    }
}

