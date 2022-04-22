import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
import { getUserByEmail } from '../domain/orm/User.orm';

import dotenv from 'dotenv';

// Config dotenv to read environment variables
dotenv.config();

const secret = process.env.SECRETKEY || 'MYSECRETKEY'; 


/**
 * 
 * @param { Request } req Original request previos middleware of verification JWT
 * @param { Response }res Response to verification of JWT
 * @param {NextFunction} next Next function to be executed
 * @returns Errors of verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
   
    // Check HEADER from Request for 'x-access-token'
    let token: any = req.headers['x-access-token'];
    
    // Verify if jwt is present
    if(!token){
        return res.status(403).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not authorized to consume this endpoint'
        });
        
    }
      
    // Verify the token obtained, we pass the secret
    jwt.verify(token, secret, async (err: any, decoded: any) => {
        if(err){
            return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify JWT token'
            })
        }

        // TODO retreive logged in user data
        let loggedUser = await getUserByEmail(decoded.email);
        res.locals.loggedUser = loggedUser;

        //Execute Next function --> Protected routes wil be executed
        next();


    })



}