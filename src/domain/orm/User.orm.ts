import  { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IUser, UserRole } from "../interfaces/IUser.interface";
import { UserResponse } from "../types/UserResponse.type";
import { kataEntity } from "../entities/Kata.entity";
import { IKata } from "../interfaces/IKata.interface";
import mongoose from "mongoose";

//CRUD

/**
 * Method to obtain all Users from Collection "Users in Mongo Server"
 */
export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        let response: any = {};

        // Search all users (using pagination)
        await userModel.find({isDeleted: false})
            .select('name email age katas')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((users:IUser[]) => {
                response.users = users;
           })

        // Count total documents in collection "users"
        await userModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;
        
        
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

//- Get User By ID
export const getUsersById = async (id: string) : Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Search User By Id
        return await userModel.findById(id).select('name email age katas');
        
    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By Id: ${error}`);    
    }
}

// - Get User By Email

export const getUserByEmail = async (email: string) : Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        //Search user by email
        return await userModel.findOne({"email": email});

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By Email: ${error}`); 
    }
}

// - Delete User By ID
export const deleteUserById = async (id: string): Promise<any | undefined> =>{
    try {
        let userModel = userEntity();
        // Delete User By Id 
        return await userModel.deleteOne({_id: id})
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting User By Id: ${error}`);    
        
    }
}

// - Update User By Id

export const updateUserById = async ( id: string, user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        //Update User
        return await userModel.findByIdAndUpdate(id, user);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`); 
    }
}

/**
 * Method to obtain user role
 * @param id 
 */
export const obtainUserPermissions = async( id: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findById(id).select('role')
        
    } catch (error) {
        LogError(`[ORM ERROR]: Obtaining User roles ${id}: ${error}`); 
        
    }
}

/**
 * Method to obtain all katas from an user"
 */
 export const getKatasFromUser = async (page: number, limit: number, id: string): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();
        let katasModel = kataEntity();

        let katasFound: IKata[] = []

        let response: any = {
            katas: []
        };

        await userModel.findById(id).then(async (user: IUser) => {

            response.user = user.email;
            console.log('katas', user.katas)

            // Create types to search
            let objectIds: mongoose.Types.ObjectId[] = [];
            user.katas.forEach((kataId: string) => {
                let objectID = new mongoose.Types.ObjectId(kataId);
                objectIds.push(objectID);    
            })
            
            await katasModel.find({"_id": {"$in": objectIds}}).then(async (katas: IKata[]) => {
                katasFound = katas;
            });

        }).catch((error) => {
            LogError(`[ORM ERROR]: Obtaining User: ${error}`); 
        })

        response.katas = katasFound;

        return response;     
        
    } catch (error) {
        LogError(`[ORM ERROR]: Getting katas from an user: ${error}`)
    }
}
