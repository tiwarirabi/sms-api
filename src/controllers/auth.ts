import { Request, Response, NextFunction } from 'express';

// import * as userService from '../services/user';

/**
 * generate and save the referesh token.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function generateToken(req: Request, res: Response, next: NextFunction) {

    /**
     * If the req has referesh_token in it's body, use that to generate a new access token
     * else generate a new refresh and access token and save he refresh token in the database.
     */
//   const allUsers = await userService.fetchAll();

//   res.json(allUsers);
}
