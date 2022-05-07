import { IKata } from "../interfaces/IKata.interface";
import mongoose from "mongoose";

export const kataEntity = () => {
    let kataSchema = new mongoose.Schema<IKata>(
        {
            name: {type: String, required: true},
            description: {type: String, required: true},
            level: {type: String, required: true},
            // intents: {type:[{by: {type: String}, count: {type: Number}, solution: {type: String}}]},
            intents: {type: [String], required: true},
            stars: {type: Number, required: true},
            creator: {type: String, required: true},
            solution: {type: String, required: true},
            participants: {type: [], required: true},
            ratings: {type: [Number], required: true },
        }
    )
    return mongoose.models.Katas || mongoose.model<IKata>('Katas', kataSchema)
}