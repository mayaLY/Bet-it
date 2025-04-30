// controllers/userBetController.ts or inside your route
import { UserBet } from '../models/bet/userBetModel'; // import the model, not the schema
import { Request, Response } from 'express';

// Example handler (async function)
export const createUserBet = async (req: Request, res: Response) => {
  try {
    const { userId, betId, optionId } = req.body;

    const newUserBet = await UserBet.create({
      user: userId,
      bet: betId,
      option: optionId,
    });

    const picks = await UserBet.find()
      .populate("user", "fullname email")
      .populate("bet", "betDescription")
      .populate("option", "optionDescription");

    res.status(201).json({ newUserBet, picks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
