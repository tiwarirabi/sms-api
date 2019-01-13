import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../domains/request/AuthRequest';
import * as authService from '../services/auth';
import jwt from 'jsonwebtoken';
// import * as userService from '../services/user';

/**
 * generate and save the referesh token.
 *
 * @param {AuthRequest} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function generateToken(req: AuthRequest, res: Response, next: NextFunction) {

     const JWT_SECRET = process.env.JWT_SECRET;
     const refreshToken = req.body.refreshToken ? req.body.refreshToken : false;
     const user = req.user ? req.user : req.body.user;
     const response = {
         user,
         refreshToken,
         accessToken: '',
     }

     const accessTokenExpiry = 60 * 60 ; //1 hour
     const refreshTokenExpiry = '7d';

     if(refreshToken){
        //Create a new Access Token 
        const accessToken = jwt.sign(user, JWT_SECRET, {expiresIn: accessTokenExpiry});

        res.json({
            ...response, 
            accessToken
        });
     }else if(user && user.id){
        //Create a new Refresh and Access Token
        //Store the refresh token in the database
        
        const refreshToken = jwt.sign(user, JWT_SECRET, {expiresIn: refreshTokenExpiry});
        const accessToken = jwt.sign(user, JWT_SECRET, {expiresIn: accessTokenExpiry});
        
        await authService.storeToken(refreshToken, user.id);
        
        res.json({
            ...response, 
            refreshToken,
            accessToken
        });
     }

}
