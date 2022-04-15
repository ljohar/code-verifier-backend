import  { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";

//CRUD

/**
 * Method to obtain all Users from Collection "Users in Mongo Server"
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        //Search all users
        return await userModel.find({isDelete: false})
        
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`)
    }
}

//- Get User By ID
export const getUsersById = async (id: string) : Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Search User By Id
        return await userModel.findById(id);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By Id: ${error}`);    
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

// - Create a New User
export const createUser = async (user: any): Promise<any | undefined> => {
    try {

        let userModel = userEntity();

        //Create / Insert new user

        return await userModel.create(user);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`); 
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
//TODO
//-Get User By ID
//-Get User By Email
//-Update User By ID