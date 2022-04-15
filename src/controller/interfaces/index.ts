import { BasicResponse } from "../types";
import { GoodbyeResponse } from "../types";


export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IGoodbyeController{
    getMessage(name?: string): Promise<GoodbyeResponse>
}

export interface IUserController {
    //Read all users from db || get user By Id
    getUsers(id?: string): Promise<any>
    //Delete User By Id
    deleteUser(id?:string): Promise<any>
    // Create new User
    createUser(user: any): Promise<any>
    // Update User
    updateUserById(id:string, user: any): Promise<any>

 
}