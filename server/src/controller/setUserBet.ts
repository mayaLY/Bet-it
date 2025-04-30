import { UserBetSchema } from '../models/bet/userBetModel';
import { Request, Response } from 'express';

const newUserBet = await UserBetSchema.create({
  user: userId,
  bet: betId,
  option: optionId, 
});

const picks = await UserBetSchema.find()
  .populate("user", "fullname email") 
  .populate("bet", "betDescription")
  .populate("option", "optionDescription");