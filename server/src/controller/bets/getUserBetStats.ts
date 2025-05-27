import { Request, Response } from 'express';
import { UserBet } from '../../models/bet/userBetModel';

export async function getUserSurveyStats(req: any, res: any) {
  try {
    const userId = req.body;

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
