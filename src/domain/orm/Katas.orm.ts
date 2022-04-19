import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSuccess } from "../../utils/logger";

// CRUD

// - Get all users

export const getAllKatas = async (): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();
        //Search all katas
        return await kataModel.find({isDelete: false})
    } catch (error) {
        LogError(`[ORM ERROR]: Getting all katas: ${error}`)
        
    }
}

// - Get Kata By Id
export const getKataById = async (id: string) : Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        //Search all katas
        return await kataModel.findById(id)
    } catch (error) {
        LogError(`[ORM ERROR]: Getting kata by id: ${error}`)
        
    }
}

// - Delete User By ID
export const deleteKataById = async (id: string): Promise<any | undefined> =>{
    try {
        let kataModel = kataEntity();
        // Delete User By Id 
        return await kataModel.deleteOne({_id: id})
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting Kata By Id: ${error}`);    
        
    }
}

// - Create a New Kata

export const createKata = async (kata: any): Promise<any | undefined> => {
    try {

        let kataModel = kataEntity();

        //Create / Insert new user

        return await kataModel.create(kata);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating Kata: ${error}`); 
    }
}

// - Update Kata By Id

export const updateKataById = async ( id: string, kata: any): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        //Update User
        return await kataModel.findByIdAndUpdate(id, kata);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`); 
    }
}

// Filter katas by level

export const filterByLevel = async (level: number) : Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.find({"level": level}).limit(5)
        
    } catch (error) {
        
        LogError(`[ORM ERROR]: Getting Katas by level ${error}`); 
    }
}

// Sort katas by creation date

export const sortByNewest = async () : Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.find().sort({date: -1}).limit(5)
        
    } catch (error) {
        LogError(`[ORM ERROR]: Sorting Kata by newest ${error}`)
    }
}

// Sort katas by ratings

export const sortByRatings = async () : Promise<any[] | undefined> =>
{
    try {
        let kataModel = kataEntity();
        return await kataModel.find().sort({score: -1})
        
    } catch (error) {
        LogError(`[ORM ERROR]: Sorting Kata by ratings ${error}`)
    }
}

// TODO
// Set a new valoration

// export const valorateKatas = async(id: string, score: number) : Promise<any | undefined> => {
//     try {
//         let kataModel = kataEntity();
//         return await kataModel.updateOne({id}, {$set:{score: {$sum: score}},{num_user: {$sum: 1}}})
        
//     } catch (error) {
//         LogError(`[ORM ERROR]: Valorating a kata ${error}`)
//     }
// }

// Sort katas by chances

export const sortByChances = async () : Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.find().sort({chances: -1})
        
    } catch (error) {
        LogError(`[ORM ERROR]: Sorting Kata by chances ${error}`)
    }
}