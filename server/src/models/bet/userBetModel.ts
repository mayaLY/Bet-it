// models/userBetModel.ts
import mongoose, { Schema } from "mongoose";

export const UserBetSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bet: {
    type: Schema.Types.ObjectId,
    ref: "Bet",
    required: true,
  },
  option: {
    type: Schema.Types.ObjectId,
    ref: "Option", 
  },
   isCorrect: {
    type: Boolean,
  },
  pickedAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserBet = mongoose.model("UserBet", UserBetSchema);
