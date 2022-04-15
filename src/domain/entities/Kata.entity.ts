import mongoose from "mongoose";

export const kapaEntity = () => {
    let kapaSchema = new mongoose.Schema(
        {
            name: String,
            description: String,
            level: Number,
            user: Number,
            date: Date,
            valoration: Number,
            Chances: Number
        }
    )
    return mongoose.model('Katas', kapaSchema)
}