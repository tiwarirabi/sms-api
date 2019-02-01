import * as tokenModel from '../models/token';

/**
 * Store the refresh token in the database.
 *
 * @param {string} refreshToken
 */
export async function storeToken(refreshToken: string, userId: number) {
  try {
    return tokenModel.save(refreshToken, userId);
  } catch (error) {
    throw error;
  }
}
