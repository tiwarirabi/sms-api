import * as tokenModel from '../models/token';

/**
 * Store the refresh token in the database.
 *
 * @param {string} refreshToken
 */
export async function storeToken(dbToken: any) {
  try {
    return tokenModel.save(dbToken);
  } catch (error) {
    throw error;
  }
}

export async function validateTokenInDatabase(dbToken: any) {
  try {
    return tokenModel.fetch(dbToken);
  } catch (error) {
    throw error;
  }
}
