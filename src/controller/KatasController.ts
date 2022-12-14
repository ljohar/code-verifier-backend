import { Get, Delete, Route, Tags, Query, Post, Put} from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogError, LogInfo, LogWarning } from "../utils/logger";
import { IKata, KataLevel } from "../domain/interfaces/IKata.interface";

// ORM - Katas Collection

import { getAllKatas, getKataById, deleteKataById, createKata, updateKataById, filterByLevel, sortByNewest, sortByRatings, sortByChances, setKataStars, tryToSolveKata } from "../domain/orm/Katas.orm";
import { response } from "express";

@Route("api/katas")
@Tags("KatasController")

// TODO Update IKataController interface
export class KataController implements IKataController{
    
    /**
     * Endpoint to retreive all katas in the collection katas
     * @param {string} id of kata to retreive (optional)
     * @returns All katas in the collections or the specific kata found by id
     */
    @Get("/")
    public async getKatas(@Query()page: number, @Query()limit: number,@Query()id?: string, @Query()level?: KataLevel): Promise<any> {
        let response: any = '';

        if(id){
            LogSuccess(`[/api/katas] Get Kata By Id: ${id}`);
            response = await getKataById(id);  
        }else if(level){
            LogSuccess(`[/api/katas] Get Katas By Level: ${level}`);
            response = await filterByLevel(page, limit, level);
        }else{
            LogSuccess('[/api/users] Get all katas request')
            response = await getAllKatas(page, limit);
            
        }
        return response;
    }

    
    /**
     * Endpoint to sort katas by newest 
     * @returns katas sorted by newest in descending order
     */

    public async sortkatasByNewest(): Promise<any> {
        try {
            return await sortByNewest();
            
        } catch (error) {
            LogError(`[CONTROLLER ERROR]: Sorting Katas by newest ${error}`)
        }
        
    }

    /**
     * Endpoint to sort katas by ratings 
     * @returns katas sorted by rating in descending order
     */
    public async sortKatasByRatings(): Promise<any> {
        try {
            return await sortByRatings();
            
        } catch (error) {
            LogError(`[CONTROLLER ERROR]: Sorting Katas by ratings ${error}`)
        }
    }
    
    /**
     * Endpoint to sort katas by chances 
     * @returns katas sorted by chances in descending order
     */
    public async sortKatasByChances(): Promise<any> {
        try {
            return await sortByChances();
            
        } catch (error) {
            LogError(`[CONTROLLER ERROR]: Sorting Katas by chances ${error}`)
        }
    }

    /**
     * Endpoint to delete Katas in the Collection "Katas" of DB
     * @param {string} id of kata to delete (optional) 
     * @returns message informing if deletion was correct
     */
     @Delete("/")
     public async deleteKata(@Query()id?: string, level?: string): Promise<any> {
         let response: any = '';
         
         if(id){
             LogSuccess(`[/api/katas] Delete Kata By Id: ${id}`);
             await deleteKataById(id).then((r) => { //or maybe a catch instead of .then
                 response = {
                     message: `Kata with id ${id} deleted successfully`
                 }
             });
         }else{
             LogWarning('[/api/katas] Delete Kata Request without Id')
             response = {
                 message: "Please, provide an ID to remove from database"
             }
             
         }
         
         return response;
     }
     /**
      * Endpoint to create a new Kata
      * @param kata 
      * @returns a message if the creation was successful
      */

     @Post("/")
    public async createKata(@Query()kata: IKata): Promise<any> {
        
        let response: any = '';

        if(kata){
            LogSuccess(`[/api/katas] Create New Kata: ${kata.name}`);
            await createKata(kata).then((r) => {
                LogSuccess(`[/api/katas] Created Kata: ${kata.name}`);
                response = {
                    message: `Kata created sucessfully: ${kata.name}`
                }
            });
            
        }else{
            LogWarning('[/api/katas] Register needs Kata Entity')
            response = {
                message: "Kata not registered: Please provide a Kata entity to create one"
            }
            
        }
        return response;
     }
    /**
     * Endpoint to update a Kata
     * @param id 
     * @param kata 
     * @returns message informing if updating was successful
     */
    @Put("/")
    public async updateKataById(@Query()id: string, @Query()kata: IKata): Promise<any> {
        
        let response: any = '';

        if(id){
            LogSuccess(`[/api/katas] Update Kata By Id: ${id}`);
            await updateKataById(id,kata).then((r) => { //or maybe a catch instead of .then
                response = {
                    message: `Kata with id ${id} updated successfully`
                }
            });
        }else{
            LogWarning('[/api/katas] Update Kata Request without Id')
            response = {
                message: "Please provide a valid Id"
            }
            
        }
        
        return response;
    }

    /**
     * Endpoint to add stars to a kata
     * @param id 
     * @param kata 
     * @returns message informing if updating was successful
     */
     @Put("/stars")
     public async addStars(@Query()id: string, @Query()user_star: number): Promise<any> {
         
         let response: any = '';
 
         if(id){
             LogSuccess(`[/api/katas/stars] Push stars to Kata with Id: ${id}`);
             await setKataStars(id, user_star).then((r) => {     
                 response = {
                     message: `Stars were added to Kata with Id: ${id}`
                 }
             });
         }else{
             LogWarning('[/api/katas/stars] Push stars to Kata Request without Id')
             response = {
                 message: "Please provide a valid Id"
             }
             
         }
         
         return response;
     }

     /**
      * Endpoint to update kata solution intents
      * @param id 
      * @param {string} solution provided by the user
      * @returns 
      */
      @Put("/intents")
      public async tryToSolveKata(@Query()id: string, @Query()solution: string): Promise<any> {
          
          let response: any = '';
  
          if(id){
              LogSuccess(`[/api/katas/intents] Try to solve Kata with Id: ${id}`);
              await tryToSolveKata(id, solution).then((r) => { 
                LogSuccess(`[/api/katas] Put kata solution: ${solution}`);    
                  response = {
                      message: `Solution intent push to Kata with Id: ${id}`,
                      solution: r.solution
                  }
              });
          }else{
              LogWarning('[/api/katas/intents] Push solution to Kata Request without Id')
              response = {
                  message: "Please provide a valid Id"
              }
              
          }
          
          return response;
      }

    
    




    
}