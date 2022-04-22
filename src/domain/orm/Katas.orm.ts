import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";

// Environment variables
import dotenv from 'dotenv';

// Configuration of  environment variables
dotenv.config();

// CRUD

// - Get all katas from collection "Katas" in Mongo Server

export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        let response: any = {};

        // Search all katas (using pagination)
        await kataModel.find({isDelete: false})
            .limit(limit)
            .skip((page-1)*limit)
            .exec().then((katas: IKata[]) => {
                response.katas = katas;
            });

        // Count total documents in collection "katas"
        await kataModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total/limit);
            response.currentPage = page;
        })

        return response

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all katas: ${error}`)
        
    }
}

// - Get Kata By Id
export const getKataById = async (id: string) : Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        //Search kata By Id
        return await kataModel.findById(id)

    } catch (error) {
        LogError(`[ORM ERROR]: Getting kata by id: ${error}`)
        
    }
}

// - Delete Kata By ID
export const deleteKataById = async (id: string): Promise<any | undefined> =>{
    try {
        let kataModel = kataEntity();
        // Delete Kata By Id 
        return await kataModel.deleteOne({_id: id})
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting Kata By Id: ${error}`);    
        
    }
}

// - Create a New Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
    try {

        let kataModel = kataEntity();

        //Create / Insert new kata

        return await kataModel.create(kata);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating Kata: ${error}`); 
    }
}

// - Update Kata By Id

export const updateKataById = async ( id: string, kata: IKata): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        //Update User
        return await kataModel.findByIdAndUpdate(id, kata);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`); 
    }
}

// Filter katas by level

export const filterByLevel = async (page: number, limit: number, level: string) : Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();

        let response: any = {};

        await kataModel.find({"level": level})
            .select('name chances description level score')
            .limit(limit)
            .skip((page-1)*limit)
            .exec().then((katas: any[]) => {
                response.katas = katas;
            });

        // Count total documents in collection "katas" by level
        await kataModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total/limit);
            response.currentPage = page;
        })
        return response
        
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

// TODO rename score property and save average --> group/then


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