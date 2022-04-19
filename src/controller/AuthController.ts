import { Get, Delete, Route, Tags, Query, Post, Put} from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogInfo, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// ORM imports

import { loginUser, registerUser, logoutUser } from "../domain/orm/Auth.orm";

@Route("api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController{

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {

        let response: any = '';

        if(user){
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/users] Create user: ${user}`);
                response = {
                    message: `User created sucessfully: ${user.name}`
                }
            });
            
        }else{
            LogWarning('[/api/auth/register] Register needs User Entity')
            response = {
                message: "Please provide a user entity"
            }
            
        }

        return response;
    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {

        let response: any = '';

        if(auth){
            LogSuccess(`[/api/auth/login] Logged In User: ${auth.email}`);
            await loginUser(auth).then((r) => {
                LogSuccess(`[/api/auth/login] Logged In User: ${auth.email}`);
                response = {
                    message: `User logged in sucessfully: ${auth.email}`,
                    token: r.token //JWT generated
                }
            });

        }else{
            LogWarning('[/api/auth/login] Register needs Auth Entity (email and password)')
            response = {
                message: "Please provide an email && password"
            }
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