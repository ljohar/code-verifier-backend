import { IUser } from "../../domain/interfaces/IUser.interface";
import { IKata } from "../../domain/interfaces/IKata.interface";
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
    getUsers(page: number, limit: number, id?: string): Promise<any>
    // Get Katas
    getKatas(page: number, limit: number, id?: string): Promise<any>
    //Delete User By Id
    deleteUser(id?:string): Promise<any>
    // Update User
    updateUserById(id:string, user: any): Promise<any>
}

export interface IKataController {
    // Read all katas from db || get a specific kata by Id
    getKatas(limit: number, page: number, id?: string, level?:string): Promise<any>
    // Get all katas of a User

    // Delete Kata By Id
    deleteKata(id?:string): Promise<any>
    // Create Kata
    createKata(kata: IKata): Promise<any>
    // Update Kata
    updateKataById(id:string, kata: IKata): Promise<any>
    // Sort katas by newest
    sortkatasByNewest(): Promise<any>
    // Sort katas by ratings
    sortKatasByRatings(): Promise<any>
    // Sort by chances
    sortKatasByChances(): Promise<any>
}

export interface IAuthController {
    // register users
    registerUser(user: IUser): Promise<any>
    // login user
    loginUser(auth: any): Promise<any>
}