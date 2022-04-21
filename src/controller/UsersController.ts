import { Get, Delete, Route, Tags, Query, Post, Put} from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError, LogInfo, LogWarning } from "../utils/logger";

// ORM - Users Collection
import { getAllUsers, getUsersById, deleteUserById, createUser, updateUserById } from "../domain/orm/User.orm"



@Route("api/users")
@Tags("UserController")
export class UserController implements IUserController{
    /**
     * Endpoint to retrieve the Users in the Collection "Users" od DB
     * @param {string} id of user to retreive (optional) 
     * @returns All users in the Collection or the specific user if Id 
     */
    @Get("/")
    public async getUsers(@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/users] Get User By Id: ${id}`);
            response = await getUsersById(id);
             
        }else{
            LogSuccess('[/api/users] Get all users request')
            response = await getAllUsers(page, limit);
            
        }
        
        return response;
    }
    /**
     * Endpoint to delete the Users in the Collection "Users" of DB
     * @param {string} id of user to delete (optional) 
     * @returns message informing if deletion was successful
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/users] Delete User By Id: ${id}`);
            await deleteUserById(id).then((r) => { //or maybe a catch instead of .then
                response = {
                    message: `User with id ${id} deleted successfully`
                }
            });
        }else{
            LogWarning('[/api/users] Delete User Request without Id')
            response = {
                message: "Please, provide a valid Id"
            }
            
        }
        
        return response;
    }
    
    /**
     * Endpoint to update an user
     * @param id 
     * @param user 
     * @returns message informing if updating was successful
     */
    @Put("/")
    public async updateUserById(@Query()id: string, @Query()user: any): Promise<any> {
        let response: any = '';

        if(id){
            LogSuccess(`[/api/users] Update User By Id: ${id}`);
            await updateUserById(id,user).then((r) => { //or maybe a catch instead of .then
                response = {
                    
                    message: `User with id ${id} updated successfully`
                }
            });
        }else{
            LogWarning('[/api/users] Update User Request without Id')
            response = {
            
                message: "Please provide a valid Id"
            }
            
        }
        
        return response;
    }
    
    
    
}