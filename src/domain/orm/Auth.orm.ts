import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import { LogSuccess, LogError } from "../../utils/logger";
import  { userEntity } from "../entities/User.entity";

// Bcrypt
import bcrypt from 'bcrypt';

// JWT
import jwt from 'jsonwebtoken'

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

        // Find user by email
        userModel.findOne({email: auth.email}, (err: any, user:IUser)=>{
           if(err){
               // TODO return ERROR while searching (500)
           } 

           if(!user){
               // TODO return ERROR user not found (404)
           }

           // Use Bcrypt to compare password

           let validPassword = bcrypt.compare(auth.password, user.password);

           if(!validPassword){
               // TODO --> Not authorized (401)
           }

           // Create JWT
           // TODO Secret must be in .env
           let token = jwt.sign({email: user.email}, 'MYSECRETWORD',{
               expiresIn: "24h"
           }); //user._id

           return token;

        });     
        
    } catch (error) {
        LogError(`[ORM ERROR]: Login User: ${error}`); 
    }
}
// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    //TODO not implemented
}
