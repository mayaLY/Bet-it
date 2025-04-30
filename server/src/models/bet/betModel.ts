import mongoose, { Schema } from "mongoose";


export interface IBet extends Document {
    betDescription:String,
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
      },
      createdAt: {
        type: Date,
      },
      expiresAt: {
        type: Date,
      },
  }
export const BetSchema = new mongoose.Schema({
    betDescription:String,
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      expiresAt: {
        type: Date,
      },


})
export const Bet = mongoose.model('Bet',BetSchema);