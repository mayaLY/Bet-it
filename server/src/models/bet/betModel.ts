import mongoose, { Schema } from "mongoose";

export const BetSchema = new mongoose.Schema({
    betDescription:String,
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
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