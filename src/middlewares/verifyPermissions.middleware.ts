import { getUsersById, obtainUserPermissions } from '../domain/orm/User.orm';
import { Request, Response, NextFunction } from 'express'
import { nextTick } from 'process';

export const verifyPermissions = (role: string) => { 

    return async (req: Request, res: Response, next: NextFunction) => {
        let userId: any = res.locals.loggedUser?._id
        
        console.log(`[MIDDLEWARE] user logged in: ${userId}`)

        let userRole: any = (await obtainUserPermissions(userId)).role;
        console.log(`user role is: ${userRole}`);
        
        if(!(role==userRole)){
            return res.status(401).send({
                message: "Forbbiden"
            })
        }
        next();
    }

    

    


}