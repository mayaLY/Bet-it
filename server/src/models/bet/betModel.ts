import mongoose from "mongoose";

export const BetSchema = new mongoose.Schema({
    betDescription:String,
    options:String[],
    


})