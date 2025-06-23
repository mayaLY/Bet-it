import { Request, Response } from 'express';
import { UserBet } from '../../models/bet/userBetModel';

export async function getUserBetStats(req: any, res: any) {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const totalAnswered = await UserBet.countDocuments({ user: userId });
    const correctAnswers = await UserBet.countDocuments({ user: userId, isCorrect: true });
    const incorrectAnswers = totalAnswered - correctAnswers;

    res.status(200).json({
      totalAnswered,
      correctAnswers,
      incorrectAnswers,
    });
  } catch (error) {
    console.error('Error fetching user survey stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
