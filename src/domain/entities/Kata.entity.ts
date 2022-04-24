import { IKata } from "../interfaces/IKata.interface";
import mongoose from "mongoose";

export const kataEntity = () => {
    let kataSchema = new mongoose.Schema<IKata>(
        {
            name: {type: String, required: true},
            description: {type: String, required: true},
            level: {type: String, required: true},
            intents: {type: Number, required: true},
            stars: {type: Number, required: true},
            creator: {type: String, required: true},
            solution: {type: String, required: true},
            participants: {type: [], required: true},
            stars_array: {type: [], required: true },
        }
    )
    return mongoose.models.Katas || mongoose.model<IKata>('Katas', kataSchema)
}