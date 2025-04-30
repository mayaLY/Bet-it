import mongoose, { Schema } from "mongoose";
import { Bet } from "./betModel";


export const OptionSchema = new mongoose.Schema({
    optionDescription:String,
    Bet:{
        type: Schema.Types.ObjectId,
        ref: 'Bet', 
      },

})
export const Option = mongoose.model('Option',OptionSchema);