import { Get, Delete, Route, Tags, Query, Post, Put} from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogInfo, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// ORM imports

import { getUsersById } from "../domain/orm/User.orm";
import { loginUser, registerUser, logoutUser } from "../domain/orm/Auth.orm";
import { AuthResponse, ErrorResponse } from "./types";

@Route("api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController{

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {

        let response: any = '';

        if(user){
            LogSuccess(`[/api/auth/register] Register New User: ${user.email}`);
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/auth/register] Create user: ${user.email}`);
                response = {
                    message: `User created sucessfully: ${user.name}`
                }
            });
            
        }else{
            LogWarning('[/api/auth/register] Register needs User Entity')
            response = {
                message: "User not registered: Please provide a user entity"
            }
            
        }
        return response;
    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {

        let response: AuthResponse | ErrorResponse | undefined;

        if(auth){
            LogSuccess(`[/api/auth/login] Logged In User: ${auth.email}`);
            let data = await loginUser(auth);
            response ={
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }

        }else{
            LogWarning('[/api/auth/login] Register needs Auth Entity (email and password)')
            response = {
                error: '[AUTH ERROR]: Email & Password are needed',
                message: "Please provide an email && password"
            }
        }
        return response;
    }

    /**
     * Endpoint to retrieve the User in the Collection "Users" of DB
     * Middleware: Validate JWT
     * In header you must add the x-access-token with a valid JWT
     * @param {string} id of user to retreive 
     * @returns User data 
     */
     @Get("/me")
     public async userData(@Query()id: string): Promise<any> {
         let response: any = '';
         
         if(id){
             LogSuccess(`[/api/users] Get User data By Id: ${id}`);
             response = await getUsersById(id);
             // Remove the password
             response.password = '';
         }
         
         return response;
     }

    @Post("/logout")
    public async logoutUser() : Promise<any>{

        let response: any = '';

        

        // TODO Close user session
        throw new Error("Method not implemented.");

    }

}