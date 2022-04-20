import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import { LogSuccess, LogError } from "../../utils/logger";
import  { userEntity } from "../entities/User.entity";

// Environment variables
import dotenv from 'dotenv';


// Bcrypt
import bcrypt from 'bcrypt';

// JWT
import jwt from 'jsonwebtoken'

// Configuration of  environment variables
dotenv.config();

// Obtain Secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY'; // Eventually verify if the key exists

/**
 * ORM to connect to Auth Collection
 */

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {

        let userModel = userEntity();

        //Create / Insert new user

        return await userModel.create(user);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`); 
    }
}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {

        let userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token = undefined;

        // Check if user exists
        await userModel.findOne({email: auth.email}).then((user: IUser) => {
            userFound = user;
        }).catch((error) => {
           console.error(`[ERROR in AUTH ORM]: User Not Found`) 
           throw new Error(`[ERROR in AUTH ORM]: User Not Found: ${error}`)
        })

        // Check if password is valid (compare with bcrypt)
        let validPassword = bcrypt.compare(auth.password, userFound!.password);

        if(!validPassword){
            console.error(`[ERROR in AUTH ORM]: Password not valid`) 
           throw new Error(`[ERROR in AUTH ORM]: Password not valid`)
        }

        // Generate JWT
        token = jwt.sign({email: userFound!.email}, secret,{
                   expiresIn: "24h"
        }); 

        return {
            user: userFound,
            token: token
        }     
        
    } catch (error) {
        LogError(`[ORM ERROR]: Login User: ${error}`); 
    }
}
// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    //TODO not implemented
}
